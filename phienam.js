// Giả sử bạn có một từ cần lấy phiên âm
var word = "你好";
var phienAmListJson = window.Dich.phienam(word); // Gọi hàm getPhienAm

// Chuyển đổi chuỗi JSON thành mảng
var phienAmList = JSON.parse(phienAmListJson);

// Sử dụng join để kết hợp các phần tử trong mảng thành một chuỗi
console.log(phienAmList.join(" ")); // In ra danh sách phiên âm
