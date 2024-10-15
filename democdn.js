// script.js
(function() {
    // Thoát sớm nếu URL không bắt đầu với "https://chatgpt.com/c/"
    if (!window.location.href.startsWith("https://github.com/fnooub/namjs/new/main")) return;

    var cdnLinks = [
        "https://code.jquery.com/jquery-3.6.0.min.js",  // Link CDN 1 (jQuery)
        "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js"  // Link CDN 2 (Lodash)
    ];

    // Hàm tải từng script
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
                    callback();  // Gọi callback khi tất cả script đã tải
                }
            }
        }

        loadNext();  // Bắt đầu tải script đầu tiên
    }

    // Gọi hàm để tải các script và sau đó thực thi mã
    loadScriptsSequentially(cdnLinks, function() {
        // Sử dụng jQuery sau khi các thư viện đã tải xong
        $('body').html('<h1>Nội dung đã được thay đổi!</h1>');
        $('body').css('background-color', '#f0f0f0');
        $('body').append('<button id="myButton">Click Me</button>');
        
        // Sử dụng Lodash (vd. in mảng)
        var arr = [1, 2, 3, 4];
        console.log(_.reverse(arr));  // In ra: [4, 3, 2, 1]
        
        // Thêm sự kiện click cho button
        $('#myButton').on('click', function() {
            alert('Button clicked!');
        });
    });
})();
