// Lưu đối tượng vào localStorage
function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value)); // Chuyển đối tượng thành chuỗi JSON
}
// Lấy đối tượng từ localStorage
function getLocalStorage(key) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null; // Chuyển chuỗi JSON thành đối tượng
}
// Lưu dữ liệu vào localStorage
setLocalStorage('userSettings', { theme: 'dark', language: 'en' });

// Lấy dữ liệu từ localStorage
const userSettings = getLocalStorage('userSettings');

console.log(userSettings); // { theme: 'dark', language: 'en' }
console.log(userSettings.theme); // 'dark'
console.log(userSettings.language); // 'en'

// Lỗi [object Object] sẽ không còn nữa nếu bạn làm đúng
const userSettings = getLocalStorage('userSettings');
const settingsString = JSON.stringify(userSettings);
console.log(settingsString); // In ra chuỗi JSON
