(function(window, document) {
    'use strict';

    if (!window.location.href.startsWith("https://m.sinodan.link/view/")) return;

    // INDEX
    var pageName = document.title,
        endDownload = false,

        LINE = '\n\n',
        LINE2 = '\n\n\n\n',

        txt = '',
        url = '',
        count = 0,
        begin = '',
        end = '',

        chapId = '',
        chapTitle = '',
        titleError = [];

    // Tạo nút download
    var downloadLink = document.createElement('button');
    downloadLink.innerText = 'Tải xuống';
    
    // Style cho nút
    downloadLink.style.position = 'fixed';
    downloadLink.style.top = '10px';
    downloadLink.style.right = '10px';
    downloadLink.style.zIndex = '9999';
    downloadLink.style.padding = '10px 20px';
    downloadLink.style.backgroundColor = '#4CAF50';
    downloadLink.style.color = 'white';
    downloadLink.style.border = 'none';
    downloadLink.style.borderRadius = '5px';
    downloadLink.style.cursor = 'pointer';
    
    // Thêm nút vào body
    document.body.appendChild(downloadLink);


    downloadLink.addEventListener('click', async function (e) {
        e.preventDefault();

        if (endDownload) {
            saveEbook(); // Kết thúc tải ngay lập tức nếu đã nhấn nút lần nữa
            return;
        }

        document.title = '[...] Vui lòng chờ trong giây lát';

        var firstChap = location.href;
        console.log(firstChap);

        // Thêm sự kiện click cho saveEbook ngay lập tức để có thể kết thúc sớm
        downloadLink.addEventListener('click', saveEbook); 

        // Bắt đầu tải nội dung
        await getContent(firstChap);

        // Chỉ gỡ bỏ sự kiện khi đã thực sự kết thúc tải
        window.addEventListener('beforeunload', beforeUnloadHandler);
    });

    function beforeUnloadHandler() {
        return 'Truyện đang được tải xuống...';
    }

    function downloadFail(err) {
        downloadLink.style.backgroundColor = 'red';
        titleError.push(chapTitle);

        txt += LINE + url + LINE;
    }

    function saveEbook() {
        if (endDownload) return;
        endDownload = true;

        var ebookTitle = document.querySelector('h1').innerText.trim(),
            fileName = ebookTitle + '.txt',
            beginEnd = '';

        if (titleError.length) {
            titleError = LINE + 'Các chương lỗi: ' + titleError.join(', ') + LINE;
        } else {
            titleError = '';
        }

        if (begin !== end) beginEnd = 'Từ [' + begin + '] đến [' + end + ']';

        // data
        txt = ebookTitle.toUpperCase() + LINE2 + beginEnd + LINE + titleError + LINE2 + txt;

        // Ghi nội dung vào tệp thông qua phương thức Java
        window.Dich.savetxt(fileName, txt); // Ghi tệp txt

        // Cập nhật trạng thái tải xuống
        downloadLink.innerText = 'Tải xong'; // Cập nhật văn bản hiển thị
        downloadLink.style.display = 'block'; // Đảm bảo rằng liên kết tải về được hiển thị
        downloadLink.style.backgroundColor = 'greenyellow'; // Cập nhật màu nền trạng thái tải

        // Gỡ bỏ sự kiện không cần thiết
        downloadLink.removeEventListener('click', saveEbook); // Tắt sự kiện click

        window.removeEventListener('beforeunload', beforeUnloadHandler);

        document.title = '[⇓] ' + ebookTitle;
    }

    async function getContent(chapId) {
        if (endDownload) return;

        try {
            const response = await fetch(chapId);  // Chờ lấy dữ liệu trang
            const responseText = await response.text();  // Chờ lấy nội dung dạng text
            
            var parser = new DOMParser();
            var doc = parser.parseFromString(responseText, 'text/html');
            var chapterContent = doc.querySelector('.page-content.font-large');
            var notContent = chapterContent.querySelectorAll('iframe, script, style');
            var nextUrl;

            if (endDownload) return;

            var nextButton = doc.querySelector('span.curr')?.nextElementSibling || doc.querySelector('a.next');
            chapTitle = doc.querySelector('h1').innerText.trim();

            if (!chapterContent) {
                downloadFail('Missing content.');
            } else {
                downloadLink.style.backgroundColor = 'yellow';

                notContent.forEach(el => el.remove());

                txt += chapTitle + LINE;
                txt += chapterContent.innerHTML;
            }

            if (count === 0) begin = chapTitle;
            end = chapTitle;

            count++;

            document.title = '[' + count + '] ' + pageName;

            downloadLink.innerText = 'Đang tải chương: ' + count;

            nextUrl = nextButton.getAttribute('href');
            if (!nextUrl || nextUrl === '#') {
                saveEbook();
            } else {
                await getContent(nextUrl);
            }

        } catch (err) {
            chapTitle = null;
            downloadFail(err);  // Xử lý khi lỗi xảy ra
            saveEbook();  // Kết thúc quá trình tải dù có lỗi
        }
    }

})(window, document);
