// ==UserScript==
// @name         Show Element Details on Click
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Display details of an HTML element when clicked.
// @author       YourName
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Create a floating box to display element details
    const infoBox = document.createElement('div');
    infoBox.style.position = 'fixed';
    infoBox.style.bottom = '10px';
    infoBox.style.right = '10px';
    infoBox.style.padding = '10px';
    infoBox.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    infoBox.style.color = 'white';
    infoBox.style.fontSize = '14px';
    infoBox.style.borderRadius = '5px';
    infoBox.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
    infoBox.style.zIndex = '10000';
    infoBox.style.maxWidth = '300px';
    infoBox.style.display = 'none';
    infoBox.style.whiteSpace = 'pre-wrap';
    document.body.appendChild(infoBox);

    // Add a click event listener to the document
    document.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();

        const element = event.target;

        // Collect element details
        const tagName = element.tagName.toLowerCase();
        const id = element.id ? `#${element.id}` : '';
        const classes = element.className ? `.${element.className.split(' ').join('.')}` : '';
        const innerText = element.innerText.trim();
        const attributes = Array.from(element.attributes)
            .map(attr => `${attr.name}="${attr.value}"`)
            .join(' ');

        // Update and show the infoBox
        infoBox.textContent = `
Tag: ${tagName}${id}${classes}
Attributes: ${attributes}
Content: ${innerText || '[No Content]'}
        `.trim();
        infoBox.style.display = 'block';

        // Hide the box after 5 seconds
        setTimeout(() => {
            infoBox.style.display = 'none';
        }, 5000);
    });
})();
