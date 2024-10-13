(function() {
    'use strict';

    // Kiểm tra nếu URL khớp với mẫu yêu cầu
    if (window.location.href.match(/^https:\/\/m\.sinodan\.link\/view\/.*\.html$/)) {
        // Tạo nút download
        const downloadButton = document.createElement('button');
        downloadButton.innerText = 'Download TXT';

        // Thêm style để đặt nút ở góc phải trên cùng màn hình
        downloadButton.style.position = 'fixed';
        downloadButton.style.top = '10px'; // Cách đỉnh 10px
        downloadButton.style.right = '10px'; // Cách phải 10px
        downloadButton.style.zIndex = '9999'; // Đảm bảo nút nằm trên các thành phần khác
        downloadButton.style.padding = '10px 20px'; // Thêm padding cho nút
        downloadButton.style.backgroundColor = '#4CAF50'; // Màu nền xanh
        downloadButton.style.color = 'white'; // Màu chữ trắng
        downloadButton.style.border = 'none'; // Loại bỏ viền
        downloadButton.style.borderRadius = '5px'; // Bo tròn các góc
        downloadButton.style.cursor = 'pointer'; // Con trỏ chuột khi hover

        // Thêm nút vào trang
        document.body.appendChild(downloadButton);

        // Tạo sự kiện click cho nút
        downloadButton.addEventListener('click', () => {
            // Nội dung cho file .txt
            const textContent = "Hello, this is a text file generated from blob!";
            
            // Tạo một Blob từ nội dung text
            const blob = new Blob([textContent], { type: 'text/plain' });

            // Tạo URL cho blob
            const blobUrl = URL.createObjectURL(blob);

            // Tạo thẻ <a> để thực hiện hành động tải xuống
            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = 'example.txt'; // Tên file sẽ được tải về

            // Click vào thẻ <a> để bắt đầu tải
            a.click();

            // Hủy bỏ URL sau khi đã tải để giải phóng bộ nhớ
            URL.revokeObjectURL(blobUrl);
        });
    }
})();
