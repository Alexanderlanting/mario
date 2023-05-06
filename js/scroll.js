const content = document.querySelector('body');
const scrollLeftBtn = document.querySelector('#grass button:nth-of-type(1)');
const scrollRightBtn = document.querySelector('#grass button:nth-of-type(2)');
let scrollIntervalId;
let scrolling = false;

function startScrolling(direction) {
  if (!scrolling && !content.classList.contains('no-scroll')) {
    scrollIntervalId = setInterval(function() {
      content.scrollLeft += direction * 15;
    }, 10);
    scrolling = true;
  }
}

function stopScrolling() {
  clearInterval(scrollIntervalId);
  scrolling = false;
}

scrollLeftBtn.addEventListener('mousedown', function() {
  startScrolling(-1);
});

scrollRightBtn.addEventListener('mousedown', function() {
  startScrolling(1);
});

scrollLeftBtn.addEventListener('mouseup', stopScrolling);
scrollRightBtn.addEventListener('mouseup', stopScrolling);
scrollLeftBtn.addEventListener('mouseleave', stopScrolling);
scrollRightBtn.addEventListener('mouseleave', stopScrolling);

// Add event listeners for arrow keys, Enter, and Spacebar
let arrowKeyDown = false; // track whether arrow key is being held down

function handleKeyDown(event) {
  if ((event.key === 'ArrowLeft' || event.key === 'ArrowRight') && !arrowKeyDown && !scrolling && !content.classList.contains('no-scroll')) {
    // start scrolling only if arrow key is not already being held down, scrolling is not already in progress, and the body element does not have the no-scroll class
    arrowKeyDown = true;
    startScrolling(event.key === 'ArrowLeft' ? -1 : 1);
  } else if ((event.key === 'Enter' || event.key === ' ') && !scrolling && content.classList.contains('no-scroll')) {
    // prevent scrolling when user presses Enter or Spacebar while body has no-scroll class
    event.preventDefault();
  } else if ((event.key === 'Enter' || event.key === ' ') && document.activeElement === scrollLeftBtn && !scrolling) {
    // start scrolling left when user presses Enter or Space on scrollLeftBtn
    startScrolling(-1);
  } else if ((event.key === 'Enter' || event.key === ' ') && document.activeElement === scrollRightBtn && !scrolling) {
    // start scrolling right when user presses Enter or Space on scrollRightBtn
    startScrolling(1);
  }
}

function handleKeyUp(event) {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    // stop scrolling only if arrow key was being held down
    arrowKeyDown = false;
    stopScrolling();
  } else if ((event.key === 'Enter' || event.key === ' ') && (document.activeElement === scrollLeftBtn || document.activeElement === scrollRightBtn)) {
    // stop scrolling when user releases Enter or Space on either scrollLeftBtn or scrollRightBtn
    stopScrolling();
  }
}

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);
