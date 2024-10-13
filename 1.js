(function() {
    'use strict';

    // Tạo nút download
    const downloadButton = document.createElement('button');
    downloadButton.innerText = 'Download TXT';
    
    // Style cho nút
    downloadButton.style.position = 'fixed';
    downloadButton.style.top = '10px';
    downloadButton.style.right = '10px';
    downloadButton.style.zIndex = '9999';
    downloadButton.style.padding = '10px 20px';
    downloadButton.style.backgroundColor = '#4CAF50';
    downloadButton.style.color = 'white';
    downloadButton.style.border = 'none';
    downloadButton.style.borderRadius = '5px';
    downloadButton.style.cursor = 'pointer';
    
    // Thêm nút vào body
    document.body.appendChild(downloadButton);

    // Tạo sự kiện click cho nút
    downloadButton.addEventListener('click', () => {
        const textContent = "Đây là nội dung văn bản mà bạn muốn lưu!";
        // Gọi hàm Kotlin thông qua interface để lưu file
        window.JavaInterface.saveTextFile("example", textContent);
    });
})();
