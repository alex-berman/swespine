export function openPopup(content, buttons, { width=null }) {
  document.getElementById('overlay').style.display = 'block';
  const popup = document.getElementById('popup');
  if(width) {
    popup.style.width = width;
  }
  popup.innerHTML = content;
  for(const [text, action] of buttons) {
    const button = document.createElement('button');
    button.className = 'popupButton';
    button.textContent = text;
    button.addEventListener('click', action);
    popup.appendChild(button);
  }
  popup.style.display = 'block';
}

export function closePopup() {
  document.getElementById('overlay').style.display = 'none';
  document.getElementById('popup').style.display = 'none';
}