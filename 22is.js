(function () {
    'use strict';

    if (!window.location.href.startsWith("https://www.22is.com/read/")) return;

    // Tạo nút tải xuống và thêm vào trang
    const downloadButton = document.createElement('a');
    downloadButton.style = 'background-color: lightblue; padding: 5px; text-decoration: none; position: fixed; top: 20px; left: 20px; z-index: 9999;';
    downloadButton.href = '#';
    downloadButton.innerText = 'Tải xuống';
    downloadButton.addEventListener('click', (e) => {
        e.preventDefault();
        fetchLinks();
    });
    document.body.appendChild(downloadButton);

    // Hàm thêm delay
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Hàm lấy các liên kết từ trang
    async function fetchLinks() {
        const allLinks = [];
        try {
            const pageLinks = document.querySelectorAll('#chapterList a');
            pageLinks.forEach(link => {
                const linkText = link.textContent.trim();
                const linkHref = link.getAttribute('href');
                allLinks.push({ text: linkText, href: new URL(linkHref, location.origin).href });
            });
        } catch (error) {
            console.error('Lỗi khi lấy danh sách liên kết:', error);
        }

        if (allLinks.length === 0) {
            alert('Không tìm thấy liên kết nào!');
            return;
        }

        console.log('Danh sách liên kết:', allLinks);
        await fetchContentFromLinks(allLinks);
    }

    // Hàm lấy nội dung từ thẻ .txtnav của các liên kết trong allLinks
    async function fetchContentFromLinks(links) {
        const allContent = [];

        for (let i = 0; i < links.length; i++) {
            const link = links[i];

            try {
                // Thêm delay trước mỗi yêu cầu
                await delay(1000);

                // Fetch nội dung của trang liên kết
                const response = await fetch(link.href);
                const text = await response.text();

                // Tạo DOM từ nội dung trang để lấy thẻ .txtnav
                const parser = new DOMParser();
                const doc = parser.parseFromString(text, 'text/html');
                const content = doc.querySelector('.txtnav')?.textContent.trim() || '';

                // Gộp link text và nội dung
                const combinedContent = `${link.text}\n${content}`;

                // Thêm nội dung vào mảng allContent
                allContent.push(combinedContent);

                // Cập nhật tiến độ trong nút tải xuống
                downloadButton.innerText = `Đang tải: ${i + 1} / ${links.length}`;
            } catch (error) {
                console.error(`Lỗi khi tải nội dung từ ${link.href}:`, error);
            }
        }

        // Khi hoàn thành, tạo tệp txt và tải xuống
        downloadTxtFile(allContent);
    }

    // Hàm tạo và tải tệp .txt
    function downloadTxtFile(contentArray) {
        // Tạo nội dung tệp .txt từ mảng đã có
        const fileContent = contentArray.join('\n\n');

        window.wvqt.saveTxt('tailieu', fileContent);
    }
})();
