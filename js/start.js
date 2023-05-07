var startbutton = document.querySelector('#start button');
var start = document.querySelector('#start');

startbutton.addEventListener('click', () => {
    start.classList.add('start-animation');
    content.classList.remove('no-scroll');
});