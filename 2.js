(async () => {
    try {
        // Yêu cầu người dùng chọn nơi lưu tệp
        const handle = await window.showSaveFilePicker({
            suggestedName: 'example.txt',
            types: [{
                description: 'Text Files',
                accept: { 'text/plain': ['.txt'] },
            }],
        });

        // Tạo một stream để ghi nội dung vào tệp
        const writableStream = await handle.createWritable();
        const textContent = "Hello, this is a text file!";

        // Ghi nội dung vào tệp
        await writableStream.write(textContent);

        // Đóng stream sau khi ghi xong
        await writableStream.close();
    } catch (error) {
        console.error('Error:', error);
    }
})();
