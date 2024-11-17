const button = document.createElement('button');
button.innerHTML = 'Vietphrase';
button.style.position = 'fixed';
button.style.top = '20px';
button.style.right = '20px';
button.style.zIndex = '9999';
button.style.padding = '10px 20px';
button.style.backgroundColor = '#007BFF';
button.style.color = 'white';
button.style.border = 'none';
button.style.borderRadius = '5px';
button.style.cursor = 'pointer';

document.body.appendChild(button);

button.addEventListener('click', openDialog);
function openDialog() {
    const textContent = document.body.innerText;
    window.wvqt.addVietphrase(textContent);
}
