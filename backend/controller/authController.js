
const db = require('../util/database').getDb();
const { exit } = require('process');
const security = require('../util/security');


exports.signup = (req, res, next) => {
    const clientData = req.body;
    console.log(clientData);

    function emailValidReg(res, rej) {
        db.collection("userData")
            .find({
                email: clientData.userEmail
            }, {
                usernaem: 1,
                email: 1
            })
            .toArray((err, result) => {
                if (result.length == 0) {
                    res(true);
                } else {
                    rej("Email is already taken");
                }
            })
    }

    function regDataInserted(res, rej) {

        let encryptedPassword = security.encrypt(clientData.userPass);
        // console.log('Encrypted:', encryptedPassword.toString());

        // console.log("Encrypt password ", encryptedPassword);
        // let decryptPassword = security.decrypt(encryptedPassword).toString();
        // console.log('Decrypted:', decryptPassword.toString());

        db.collection("userData")
            .insertOne({
                email: clientData.userEmail,
                password: encryptedPassword,
                imageList: []
            })
            .then(() => {
                res(true)
            })
            .catch((err) => {
                rej(err)
            })
    }

    async function validationReg() {
        // Email validation
        try {
            let emailAfter = await new Promise(emailValidReg);

            let register = await new Promise(regDataInserted);


            if (register && emailAfter) {
                res.status(201).json({
                    message: "Account is created please login by using signup form",
                    reg: true
                })
            } else {
                res.status(201).json({
                    message: "Error during reg process",
                    reg: false
                })
            }

        } catch (err) {
            let errStr = err.toString();
            res.status(203).json({
                message: "Error",
                err: errStr,
                reg: false
            })
        }

    }

    validationReg();
}

exports.signin = (req, res, next) => {
    const clientData = req.body;

    function emailValidLog(res, rej) {
        db.collection("userData")
            .find({
                email: clientData.userEmail
            }, {
                usernaem: 1,
                email: 1
            })
            .toArray((err, result) => {
                if (result.length === 0) {
                    rej("Incorrect email");
                } else {
                    res(true);
                }
            })
    }

    function passValidLog(res, rej) {
        db.collection("userData")
            .find({
                email: clientData.userEmail
            }, {
                usernaem: 1,
                email: 1,
                password: 1,
                isAdmin: 1
            })
            .toArray((err, result) => {
                if (result) {
                    // Decrypt password 
                    let decryptPassword = security.decrypt(result[0].password.buffer);
                    result[0].password = decryptPassword.toString()

                    res(result[0]);
                } else {
                    rej("Error");
                }
            })
    }

    async function validationLogin() {
        try {
            const emailExist = await new Promise(emailValidLog);
            const userDataFromDb = await new Promise(passValidLog);

            if (emailExist == true) {
                if (clientData.userPass == userDataFromDb.password) {

                    req.session.isLogin= true;
                    req.session.email = clientData.userEmail;
                    res.json({
                        message:"Login"
                    });


                } else {
                    res.status(201).json({
                        message: "Incorrect password"
                    });
                }
            } else {
                res.status(203).json({
                    message: "Incorrect email"
                })
            }
        } catch (err) {
            let errStr = err.toString();
            res.status(203).json({
                login: false,
                message: errStr
            })
        }
    }

    validationLogin();
}

exports.logout = (req, res, next) => {
    console.log("yes")
    req.session.destroy();
    res.redirect('/');
}