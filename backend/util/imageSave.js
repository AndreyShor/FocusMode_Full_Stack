const multer = require('multer');

const MINE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
}

module.exports = function storageSetUp(url) {
    return storage = multer.diskStorage({
        destination: (req, file, cb) => {
            console.log(file);
            const isValid = MINE_TYPE_MAP[file.mimetype]; 
            console.log('Is valid', isValid);
            let error = new Error('Incorect file type');
            if (isValid) {
                error = null;
            }
            const locationSave = "backend/public/img" + url;
            console.log("Adress to save", locationSave);
            cb(error, locationSave);
        }, 
        filename: (req, file, cb) => {
            const name = file.originalname.toLowerCase().split(' ').join('-')
            const ext = MINE_TYPE_MAP[file.mimetype];
            cb(null, name + '-' + Date.now() + '.' + ext);
        }
    })

}
