(function() {
    'use strict';

    // Function to create the popup
    function createPopup() {
        // HTML structure for popup
        const popupHtml = `
            <div id="translatorOverlay" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); display: flex; justify-content: center; align-items: center; z-index: 9998;">
                <div id="translatorPopup" style="width: 400px; padding: 20px; background-color: #fff; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
                    <textarea id="inputText" placeholder="Nhập tiếng trung..." style="width: 100%; height: 100px;"></textarea>
                    <button id="translateButton" style="margin-top: 10px;">Dịch</button>
                    <div id="translationResult" style="margin-top: 20px; font-size: 16px; color: #333;"></div>
                    <button id="closeButton" style="margin-top: 10px;">Đóng</button>
                </div>
            </div>
        `;

        // Append popup to the document
        document.body.insertAdjacentHTML("beforeend", popupHtml);

        // Add event listeners
        document.getElementById("translateButton").onclick = translateText;
        document.getElementById("closeButton").onclick = closePopup;
    }

    // Function to close the popup
    function closePopup() {
        const overlay = document.getElementById("translatorOverlay");
        if (overlay) {
            overlay.remove();
        }
    }

    // Function to translate text and display the result
    async function translateText() {
        const inputText = document.getElementById("inputText").value;
        try {
            const translatedText = await window.wvqt.translate(inputText);
            document.getElementById("translationResult").innerText = translatedText;
        } catch (error) {
            document.getElementById("translationResult").innerText = "Translation failed. Please try again.";
            console.error("Error during translation:", error);
        }
    }

    // Add a button to open the popup
    const openButton = document.createElement("button");
    openButton.innerText = "Mở Vietphrase";
    openButton.style.position = "fixed";
    openButton.style.bottom = "20px";
    openButton.style.right = "20px";
    openButton.style.padding = "10px 20px";
    openButton.style.fontSize = "16px";
    openButton.style.cursor = "pointer";
    openButton.onclick = createPopup;
    document.body.appendChild(openButton);
})();
