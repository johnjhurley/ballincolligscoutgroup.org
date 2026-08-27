
const button = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if (button && nav) {
  button.addEventListener('click', () => nav.classList.toggle('open'));
}
