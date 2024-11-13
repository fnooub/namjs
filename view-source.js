// ==UserScript==
// @name         View Source with Syntax Highlighting
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Thêm nút "View Source" và hiển thị mã nguồn với highlight cú pháp trong popup toàn màn hình.
// @author       Bạn
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Thêm Prism.js CSS vào trang
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/themes/prism.min.css';
    document.head.appendChild(link);

    // Tải Prism.js từ CDN
    var script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/prism.min.js';
    document.head.appendChild(script);

    // Tạo popup (modal) để hiển thị mã nguồn
    var modal = document.createElement('div');
    modal.style.display = 'none'; // Mặc định ẩn
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.9)'; // Màu nền đậm để nổi bật mã nguồn
    modal.style.zIndex = '1000';

    // Tạo vùng hiển thị mã nguồn bên trong modal
    var content = document.createElement('div');
    content.style.backgroundColor = '#fff';
    content.style.width = '100%';
    content.style.height = '100%';
    content.style.overflow = 'auto';
    content.style.color = '#333';
    content.style.fontFamily = 'monospace';
    content.style.fontSize = '12px';
    content.style.whiteSpace = 'pre-wrap'; // Đảm bảo mã nguồn không bị cắt ngắn
    content.style.wordWrap = 'break-word'; // Đảm bảo từ không bị cắt đoạn

    // Thêm nội dung vào modal
    modal.appendChild(content);
    
    // Thêm modal vào body
    document.body.appendChild(modal);

    // Tạo nút "View Source"
    var button = document.createElement('button');
    button.innerHTML = 'View Source';
    button.style.position = 'fixed';
    button.style.top = '10px';
    button.style.right = '10px';
    button.style.padding = '10px';
    button.style.backgroundColor = '#4CAF50';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.zIndex = '1000';
    button.style.fontSize = '16px';

    // Thêm nút vào trang
    document.body.appendChild(button);

    // Biến kiểm tra trạng thái của modal (hiện/ẩn)
    var isModalVisible = false;

    // Sự kiện khi nhấn nút "View Source"
    button.addEventListener('click', function() {
        if (isModalVisible) {
            modal.style.display = 'none'; // Ẩn modal nếu nó đang hiển thị
        } else {
            // Xóa nội dung cũ nếu có
            content.innerHTML = '';

            // Lấy mã nguồn HTML của trang (không bao gồm nút View Source)
            var source = document.documentElement.outerHTML;

            // Loại bỏ các phần tử liên quan đến nút "View Source" khỏi mã nguồn
            source = source.replace(button.outerHTML, ''); // Loại bỏ nút từ mã nguồn

            // Chuyển đổi mã nguồn thành chuỗi có thể hiển thị
            var formattedSource = source.replace(/</g, '&lt;').replace(/>/g, '&gt;');

            // Tạo thẻ <pre> với lớp Prism để tô sáng cú pháp
            var pre = document.createElement('pre');
            pre.className = 'language-markup'; // Chọn loại ngôn ngữ cần highlight (HTML)
            pre.innerHTML = formattedSource;

            // Thêm thẻ <pre> vào nội dung của modal
            content.appendChild(pre);

            // Khởi tạo Prism.js để highlight
            if (typeof Prism !== 'undefined') {
                Prism.highlightElement(pre);
            }

            modal.style.display = 'block'; // Hiển thị modal
        }

        // Chuyển đổi trạng thái modal
        isModalVisible = !isModalVisible;
    });
})();
