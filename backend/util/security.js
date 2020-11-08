
const crypto = require('crypto');

// Key after AES-256 alghorithm
const algorithm = 'aes-256-ctr';
let key = 'fiosdfsdio ng%&**)sjd fbiufcn vDFSDnsjcioJ ANSCN AI SNCIUASNCNNIFSDASNCI ANCANCIAfdSNCINASICNIANCA';
key = crypto.createHash('sha256').update(String(key)).digest('base64').substr(0, 32);


// Encryption of MongoDb data 
function encrypt(buffer) {
    const plain = Buffer.from(buffer);
    // Create an initialization vector
    const iv = crypto.randomBytes(16);
    // Create a new cipher using the algorithm, key, and iv
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    // Create the new (encrypted) buffer
    const result = Buffer.concat([iv, cipher.update(plain), cipher.final()]);
    return result;
}

function decrypt(encrypted) {
    // Get the iv: the first 16 bytes
    const iv = encrypted.slice(0, 16);
    // Get the rest
    encrypted = encrypted.slice(16);
    // Create a decipher
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    // Actually decrypt it
    const result = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return result;
}

exports.encrypt = encrypt;

exports.decrypt = decrypt;