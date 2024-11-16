// ==UserScript==
// @name         Vietphrase Button with Dynamic Content and Fixed Close Button
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Thêm nút Vietphrase để mở popup với nội dung thay đổi động khi click nút
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Liên kết CDN cần tải
    var cdnLinks = [
        "https://cdn.jsdelivr.net/gh/mozilla/Readability/Readability.js"
    ];

    // Hàm tải từng script tuần tự
    function loadScriptsSequentially(scripts, callback) {
        var index = 0;

        function loadNext() {
            if (index < scripts.length) {
                var script = document.createElement('script');
                script.src = scripts[index];
                script.onload = function() {
                    index++;
                    loadNext();  // Tải script tiếp theo
                };
                document.head.appendChild(script);
            } else {
                if (typeof callback === 'function') {
                    callback();  // Gọi callback khi tất cả script đã tải xong
                }
            }
        }

        loadNext();  // Bắt đầu tải script đầu tiên
    }

    // Hàm trích xuất văn bản và hiển thị vào dialogContent
    function fetchDataAndDisplay() {
        // Tạo bản sao của tài liệu để tránh thay đổi nội dung gốc
        const documentClone = document.cloneNode(true);

        // Sử dụng Readability.js để trích xuất văn bản
        const article = new Readability(documentClone).parse();

        // Lấy nội dung văn bản từ article
        const originalTextContent = article.textContent;

        // Hiển thị nội dung vào dialog
        dialogContent.innerHTML = `<h1>Nội dung đã được trích xuất:</h1><p>${originalTextContent}</p>`;
    }

    // Tạo nút Vietphrase
    const button = document.createElement('button');
    button.innerHTML = 'Vietphrase';
    button.style.position = 'fixed';
    button.style.top = '20px';  // Cách mép trên 20px
    button.style.right = '20px';  // Cách mép phải 20px
    button.style.zIndex = '9999';  // Đảm bảo nút nằm trên cùng
    button.style.padding = '10px 20px';
    button.style.backgroundColor = '#007BFF';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';

    // Thêm nút vào body
    document.body.appendChild(button);

    // Tạo dialog HTML
    const dialog = document.createElement('div');
    dialog.style.position = 'fixed';
    dialog.style.top = '0';
    dialog.style.left = '0';
    dialog.style.width = '100vw';
    dialog.style.height = '100vh';
    dialog.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';  // Nền mờ tối
    dialog.style.zIndex = '10000';  // Đảm bảo dialog nằm trên cùng
    dialog.style.display = 'none';  // Ban đầu ẩn dialog

    // Tạo nội dung của dialog
    const dialogContent = document.createElement('div');
    dialogContent.style.position = 'absolute';
    dialogContent.style.top = '50%';
    dialogContent.style.left = '50%';
    dialogContent.style.transform = 'translate(-50%, -50%)';
    dialogContent.style.textAlign = 'center';
    dialogContent.style.color = 'white';
    dialogContent.style.fontSize = '18px';
    dialogContent.style.maxWidth = '90%';  // Giới hạn độ rộng để dễ nhìn
    dialogContent.style.overflowY = 'auto';  // Cuộn dọc nếu nội dung dài

    // Tạo nút đóng với position fixed
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '×';
    closeButton.style.position = 'fixed';
    closeButton.style.top = '20px';  // Cách mép trên 20px
    closeButton.style.right = '20px';  // Cách mép phải 20px
    closeButton.style.fontSize = '24px';
    closeButton.style.color = 'white';
    closeButton.style.backgroundColor = 'transparent';
    closeButton.style.border = 'none';
    closeButton.style.cursor = 'pointer';
    closeButton.style.zIndex = '10001';  // Đảm bảo nút đóng nằm trên cùng

    // Thêm nút đóng vào dialog
    dialog.appendChild(closeButton);

    // Thêm nội dung vào dialog
    dialog.appendChild(dialogContent);

    // Thêm dialog vào body
    document.body.appendChild(dialog);

    // Hàm mở dialog
    function openDialog() {
        dialog.style.display = 'block';  // Hiển thị dialog
        fetchDataAndDisplay();  // Gọi hàm để hiển thị dữ liệu vào dialog
    }

    // Hàm đóng dialog
    function closeDialog() {
        dialog.style.display = 'none';  // Ẩn dialog
    }

    // Thêm sự kiện click cho nút đóng
    closeButton.addEventListener('click', closeDialog);

    // Thêm sự kiện click cho nút Vietphrase
    button.addEventListener('click', openDialog);

    // Tải các script cần thiết và sau đó thực hiện mã chính
    loadScriptsSequentially(cdnLinks, function() {
        console.log('Readability.js đã được tải thành công!');
    });
})();
