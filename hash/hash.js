/* hash.js */
const HashToolkit = {
    computeHash: function(text, algo) {
        if (!text) return "";
        
        let hash;
        if (algo === "MD5") {
            hash = CryptoJS.MD5(text);
        } else {
            hash = CryptoJS.SHA256(text);
        }
        return hash.toString(CryptoJS.enc.Hex);
    }
};