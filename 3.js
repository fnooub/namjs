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
        
        // Tạo một Blob từ nội dung văn bản
        const blob = new Blob([textContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob); // Tạo URL tạm thời cho Blob

        // Gọi hàm Kotlin thông qua interface để lưu file
        window.JavaInterface.saveTextFile(url, navigator.userAgent, 'attachment; filename="example.txt"', 'text/plain');
        
        // Giải phóng URL
        URL.revokeObjectURL(url); 
    });
})();
