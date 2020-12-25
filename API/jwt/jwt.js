// const Dairy = require('../model/')
const md5 = require('md5')
const jwt = require('jsonwebtoken')

const jwtKey = "dh@milksystem-8509"
const jwtExpirySeconds = 259200 //86400 second for 1 day..Here it is set for 3 days

const signIn = (req, res) => {
    const { userName, password } = req.body
    // console.log(req.body)
    Dairy.findAll({
        where: {
            userName: userName,
            password: md5(password)
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    })
        .then(Dairy => {
            if (Dairy.length > 0) {
                const token = jwt.sign({ userName }, jwtKey, {
                    algorithm: "HS256",
                    expiresIn: jwtExpirySeconds,
                })
                var data = {
                    status: true,
                    message: "Login successfully",
                    _token: token,
                    data: Dairy
                }
                return res.status(200).json(data);
            }
            else {
                var data = {
                    status: false,
                    message: "Please Enter valid Username or Password",
                };
                return res.status(401).json(data);
            }
        })
        .catch((error) => {
            console.log(error)
        })
}

const welcome = (req, res, next) => {
    let token = req.headers["x-access-token"] || req.headers["authorization"];
    if (!token) {
        var data = {
            status: false,
            message: "You need to login first...",
        };
        return res.status(500).json(data);
    } else {
        if (token.startsWith("Bearer ")) {
            var payload;
            try {
                token = token.split(" ")[1];
                payload = jwt.verify(token, jwtKey);

                next();
            } catch (e) {
                if (e instanceof jwt.JsonWebTokenError) {
                    var data = {
                        status: false,
                        message: "Login Again...",
                    };
                    return res.status(500).json(data);
                }
                var data = {
                    status: false,
                    message: "Login Again...",
                };
                return res.status(500).json(data);
            }
        }
    }
}



module.exports = {
    signIn,
    welcome
}



// router.get('/list', welcomeAdmin, DairyController.getDairy)

// //Add Dairy
// router.post('/', DairyController.addDairy)

// //Get Dairy by Id
// router.get('/:id', welcome, DairyController.getDairyById)

// //Update dairy
// router.put('/:id', welcome, DairyController.updateDairy)