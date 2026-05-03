/* hash-ui.js */
function calculateHashUI() {
    try {
        const errorMsg = document.getElementById('hashErrorMsg');
        errorMsg.innerText = '';

        const text = document.getElementById('hashInput').value;
        const algo = document.getElementById('hashAlgo').value;

        if (!text) {
            throw new Error("Please enter text to hash!");
        }

        // Gọi logic từ HashToolkit
        const result = HashToolkit.computeHash(text, algo);
        
        // Hiển thị kết quả
        document.getElementById('hashOutput').value = result;
    } catch (e) {
        document.getElementById('hashErrorMsg').innerText = 'Error: ' + e.message;
    }
}

function tryAgainHash() {
    document.getElementById('hashInput').value = '';
    document.getElementById('hashOutput').value = '';
    document.getElementById('hashErrorMsg').innerText = '';
}