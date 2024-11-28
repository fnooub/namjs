(function() {
    'use strict';

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
    dialogContent.style.fontSize = '24px';

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

    // Tạo lớp phủ (overlay) cho trang gốc
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';  // Lớp phủ mờ
    overlay.style.zIndex = '9998';  // Đảm bảo lớp phủ nằm dưới dialog
    overlay.style.display = 'none';  // Ban đầu ẩn lớp phủ

    // Thêm overlay vào body
    document.body.appendChild(overlay);

    // Hàm lấy dữ liệu và xuất vào dialogContent
    async function fetchDataAndDisplay() {
        const result = await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("Dữ liệu đã được tải thành công!");
            }, 2000); // 2 giây giả lập chờ
        });

        // Hiển thị dữ liệu lên dialogContent
        dialogContent.innerHTML = `<h1>${result}</h1>`;
    }

    // Hàm mở dialog
    function openDialog() {
        dialog.style.display = 'block';  // Hiển thị dialog
        overlay.style.display = 'block';  // Hiển thị lớp phủ
        fetchDataAndDisplay();  // Gọi hàm để hiển thị dữ liệu vào dialog

        // Vô hiệu hóa cuộn và tất cả tương tác với trang gốc
        document.body.style.overflow = 'hidden';  // Ngừng cuộn trang
        document.body.style.pointerEvents = 'none';  // Vô hiệu hóa click, hover trên trang gốc
        document.documentElement.style.pointerEvents = 'none';  // Vô hiệu hóa tương tác trên toàn bộ trang
    }

    // Hàm đóng dialog
    function closeDialog() {
        dialog.style.display = 'none';  // Ẩn dialog
        overlay.style.display = 'none';  // Ẩn lớp phủ

        // Khôi phục tương tác với trang gốc
        document.body.style.overflow = '';  // Bỏ vô hiệu hóa cuộn trang
        document.body.style.pointerEvents = '';  // Khôi phục click, hover trên trang gốc
        document.documentElement.style.pointerEvents = '';  // Khôi phục tương tác trên toàn bộ trang
    }

    // Thêm sự kiện click cho nút đóng
    closeButton.addEventListener('click', closeDialog);

    // Thêm sự kiện click cho nút Vietphrase
    button.addEventListener('click', openDialog);
})();
