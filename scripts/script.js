const background = document.querySelector('.background');

window.addEventListener('scroll', () => {
  const xPos = -window.scrollY / 2;
  background.style.transform = `translateX(${xPos}px)`;
});