var body = document.querySelector('body');

frame.addEventListener('click', () => {
    var overlay = document.getElementById('overlay' + count);
    if (frameimg.src.includes("info.png")) {
        overlay.classList.remove('hidden-display');
        body.classList.add('no-scroll');
        frameimg.src = "img/items/close.png";
    } else if (frameimg.src.includes("close.png")) {
        overlay.classList.add('hidden-display');
        body.classList.remove('no-scroll');
        frameimg.src = "img/items/info.png";
    }
});

