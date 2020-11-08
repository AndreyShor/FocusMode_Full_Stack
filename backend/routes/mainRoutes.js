const express = require('express');

const storagSetting = require('../util/imageSave');

const db = require('../util/database').getDb();

// Set up storage location for file start from 'backend/view/public/images'

const router = express.Router();
/// Authorization routes 

router.get('/', (req, res, next) => {
    if (req.session.isLogin == true) {
        res.redirect('main');
    } else {
        res.render('index', {
            isLogin: req.session.isLogin
        });
    }

});

router.get('/main', (req, res, next) => {
    if (req.session.isLogin == true) {
        const userEmailID = req.session.email;
        var promise = new Promise(function (res, rej) {
            db.collection("userData").find({
                email: userEmailID
            }, {
                imageList: 1
            }).toArray((err, result) => {
                if (err) {
                    rej(err);
                }
                res(result[0].imageList);
            })
        });

        promise.then((result) => {
            console.log(result);
            res.render('main', {
                isLogin: req.session.isLogin,
                ImageList: result
            });
        }).catch(err => console.log(err));
    } else {
        res.redirect('/');
    }
});


/// Image Work

module.exports = router;