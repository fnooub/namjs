// script.js
(function() {
    var jQueryCDN = "https://code.jquery.com/jquery-3.6.0.min.js";
    
    // Tạo thẻ script để tải jQuery
    var script = document.createElement('script');
    script.src = jQueryCDN;
    
    // Khi jQuery đã được tải xong
    script.onload = function() {
        // Sử dụng jQuery để thay đổi nội dung trang
        $('body').css('background-color', '#000');
        $('body').append('<button id="myButton">Click Me</button>');
        
        // Thêm sự kiện click cho button
        $('#myButton').on('click', function() {
            alert('Button clicked!');
        });
    };
    
    // Thêm thẻ script vào head để tải jQuery
    document.head.appendChild(script);
})();
