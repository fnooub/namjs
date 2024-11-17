// Dịch + Vietphrase
(function() {
    const button = document.createElement('button');
    button.innerHTML = 'Vietphrase';
    button.style.position = 'fixed';
    button.style.top = '20px';
    button.style.right = '20px';
    button.style.zIndex = '9999';
    button.style.padding = '5px 10px';
    button.style.backgroundColor = '#007BFF';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '3px';
    button.style.cursor = 'pointer';

    document.body.appendChild(button);

    button.addEventListener('click', openDialog);

    // Lưu textContent gốc trước khi dịch
    const originalTextContent = document.body.innerText;

    function openDialog() {
        window.wvqt.addVietphrase(originalTextContent);  // Sử dụng textContent gốc
    }

    function containsChinese(text) {
        const chineseRegex = /[\u4E00-\u9FA5]/;
        return chineseRegex.test(text);
    }

    async function translateNode(domNode) {
        const excludedTags = new Set(['SCRIPT', 'STYLE', 'BR', 'HR']);
        const stackToStockThings = [];

        function traverseDOM(node) {
            if (node.nodeType === Node.TEXT_NODE && containsChinese(node.nodeValue)) {
                stackToStockThings.push(node);
            } else if (node.nodeType === Node.ELEMENT_NODE && !excludedTags.has(node.tagName.toUpperCase())) {
                for (const childNode of node.childNodes) {
                    traverseDOM(childNode);
                }
            }
        }

        traverseDOM(domNode);

        const chineseText = stackToStockThings.map(node => node.nodeValue).join('---|---');

        try {
            const translatedText = await window.wvqt.translate(chineseText);
            console.log(translatedText);
            
            const translatedArr = translatedText.split('---|---');
            for (let i = 0; i < stackToStockThings.length; i++) {
                stackToStockThings[i].nodeValue = translatedArr[i];
            }
        } catch (error) {
            console.error('Lỗi Dịch:', error);
        }
    }

    var isChinese = document.title.match(/[\u4E00-\u9FA5]/);
    if (isChinese) {
        console.log('Trang chứa tiếng Trung. Bắt đầu dịch.');
        translateNode(document.body);
    } else {
        console.log('Trang không chứa tiếng Trung. Không cần dịch.');
    }
})();
