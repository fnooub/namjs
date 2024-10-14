(function(window, document) {
    'use strict';

    var debugLevel = 2;

    function downloadFail(err) {
        downloadStatus.style.backgroundColor = 'red';
        titleError.push(chapTitle);

        txt += LINE + url + LINE;

        if (debugLevel == 2) console.log('%cError: ' + url, 'color:red;');
        if (debugLevel > 0) console.error(err);
    }

    function saveEbook() {
        if (endDownload) return;
        endDownload = true;

        var ebookTitle = document.querySelector('h1').innerText.trim(),
            fileName = ebookTitle + '.txt',
            beginEnd = '';

        if (titleError.length) {
            titleError = LINE + 'Các chương lỗi: ' + titleError.join(', ') + LINE;
            if (debugLevel > 0) console.warn('Các chương lỗi:', titleError);
        } else {
            titleError = '';
        }

        if (begin !== end) beginEnd = 'Từ [' + begin + '] đến [' + end + ']';

        // data
        txt = ebookTitle.toUpperCase() + LINE2 + beginEnd + LINE + titleError + LINE2 + txt;

        console.log(txt);

        // Ghi nội dung vào tệp thông qua phương thức Java
        window.JavaInterface.saveTextFile(fileName, txt); // Ghi tệp txt

        // Cập nhật trạng thái tải xuống
        downloadLink.innerText = 'Tải xong'; // Cập nhật văn bản hiển thị
        downloadLink.style.display = 'block'; // Đảm bảo rằng liên kết tải về được hiển thị
        downloadStatus.style.backgroundColor = 'greenyellow'; // Cập nhật màu nền trạng thái tải

        // Gỡ bỏ sự kiện không cần thiết
        downloadLink.removeEventListener('click', saveEbook); // Tắt sự kiện click

        window.removeEventListener('beforeunload', beforeUnloadHandler);

        document.title = '[⇓] ' + ebookTitle;
        if (debugLevel === 2) console.log('%cDownload Finished!', 'color:blue;');
        if (debugLevel > 0) console.timeEnd('TXT Downloader');
    }

    function getContent(pageId) {
        if (endDownload) return;
        chapId = pageId;

        fetch(chapId)
            .then(response => response.text())
            .then(responseText => {
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
                    downloadStatus.style.backgroundColor = 'yellow';

                    notContent.forEach(el => el.remove());

                    txt += chapTitle + LINE;
                    txt += chapterContent.innerHTML;
                }

                if (count === 0) begin = chapTitle;
                end = chapTitle;

                count++;

                document.title = '[' + count + '] ' + pageName;

                downloadLink.innerText = 'Đang tải chương: ' + count;

                if (debugLevel === 2) console.log('%cComplete: ' + chapId, 'color:green;');

                nextUrl = nextButton.getAttribute('href');
                if (!nextUrl || nextUrl === '#') {
                    saveEbook();
                } else {
                    getContent(nextUrl);
                }
            })
            .catch(err => {
                chapTitle = null;
                downloadFail(err);
                saveEbook();
            });
    }

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

    var downloadLink = document.createElement('a');
    downloadLink.style.backgroundColor = 'lightblue';
    downloadLink.href = '#download';
    downloadLink.innerText = 'Tải xuống';
    document.querySelector('h1').insertAdjacentElement('beforebegin', downloadLink);

    var downloadStatus = document.createElement('div');
    document.body.appendChild(downloadStatus);

    downloadLink.addEventListener('click', function (e) {
        e.preventDefault();
        document.title = '[...] Vui lòng chờ trong giây lát';

        var firstChap = location.href;
        console.log(firstChap);
        var startFrom = firstChap;

        if (e.type === 'contextmenu') {
            downloadLink.removeEventListener('click', clickHandler);
            startFrom = prompt('Nhập ID chương truyện bắt đầu tải:', firstChap) || firstChap;
        } else {
            downloadLink.removeEventListener('contextmenu', contextMenuHandler);
        }

        if (startFrom.length) {
            getContent(startFrom);

            window.addEventListener('beforeunload', beforeUnloadHandler);

            downloadLink.addEventListener('click', saveEbook);
        }
    });

    function clickHandler(e) {
        e.preventDefault();
        saveEbook();
    }

    function contextMenuHandler(e) {
        e.preventDefault();
        downloadLink.removeEventListener('click', clickHandler);
    }

    function beforeUnloadHandler() {
        return 'Truyện đang được tải xuống...';
    }

})(window, document);
