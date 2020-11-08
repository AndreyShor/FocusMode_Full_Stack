const db = require('../util/database').getDb();
const security = require('../util/security');


exports.uploadImage = (req, res, next) => {
    const url = req.protocol + '://' + req.get("host");
    const fileUrl = url + "/img/userImages/" + req.file.filename;
    const userEmailID = req.session.email;
    

    function chnageImgUrlDb(res, rej) {
        res(db.collection("userData").updateOne({
            email: userEmailID
        }, {
            $addToSet: {
                imageList: fileUrl
            }
        }));
    }

    async function saveImage() {

        const result = await new Promise(chnageImgUrlDb);
        if (result.modifiedCount == 1) {

        }
        res.status(201).json({
            message: "OK",
            result: result
        });
    }

    saveImage();
}

exports.getImage = (req, res, next) =>{
    const userEmailID = req.session.email;
    
    
    function findImages(res, rej) {
        res(db.collection("userData").se({
            email: userEmailID
        }, {imageList: 1}
        ).toArray((err, result) => {
            if(err) {
                rej(err);
            }
            res(result[0]);
        }));
    }


    async function fetchImages() {

        const result = await new Promise(findImages);
        console.log(result);
        res(result);
    }

}