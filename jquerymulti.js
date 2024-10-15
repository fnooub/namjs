(function() {
    // Thoát sớm nếu URL không bắt đầu với "https://chatgpt.com/c/"
    if (!window.location.href.startsWith("https://github.com/fnooub/")) return;

    var cdnLinks = [
        "https://code.jquery.com/jquery-3.6.0.min.js",  // Link CDN 1 (jQuery)
        "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js"  // Link CDN 2 (Lodash)
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

    // Tải CDN và sau đó thực thi mã chính
    loadScriptsSequentially(cdnLinks, function() {
        // Sau khi jQuery được tải, thực thi IIFE với jQuery
        (function($, window, document, undefined) {
            // Sử dụng jQuery ở đây
            $(document).ready(function() {
                $('body').html('<h1>Nội dung đã được thay đổi bằng jQuery!</h1>');
                $('body').css('background-color', '#f0f0f0');
                $('body').append('<button id="myButton">Click Me</button>');
                
                $('#myButton').on('click', function() {
                    alert('Button clicked!');
                });

                // Sử dụng Lodash
                var arr = [1, 2, 3, 4];
                console.log(_.reverse(arr));  // In ra: [4, 3, 2, 1]
            });

        })(jQuery, window, document);
    });

})();
