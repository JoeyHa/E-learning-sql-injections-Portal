const crypto = require('crypto');
const algorithm = 'aes-192-cbc';
const password = 'Password used to generate key';
const key = crypto.scryptSync(password, 'salt', 24);
const iv = Buffer.alloc(16, 0);


module.exports = {

    encrypt: function(text) {
        const cipher = crypto.createCipheriv(algorithm, key, iv);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        return encrypted += cipher.final('hex');
    },
    decrypt: function(encryptText) {
        const decipher = crypto.createDecipheriv(algorithm, key, iv);
        let decrypted = decipher.update(encryptText, 'hex', 'utf8');
        return decrypted += decipher.final('utf8');
    }
};