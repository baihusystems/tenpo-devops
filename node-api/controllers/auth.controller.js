const db = require("../models");
const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const User = db.user;
const userToken = db.userToken;

exports.signup = (req, res) => {
    User.create({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, parseInt(config.lengthPassword))
        })
        .then(user => {
            res.send({ message: `Usuario [${req.body.username}] Registrado Exitosamente` });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.signin = (req, res) => {
    User.findOne({
            where: {
                username: req.body.username
            }
        })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: `Usuario [${req.body.username}] no Existe` });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Contraseña Invalida"
                });
            }

            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 3600 // 1 hour
            });

            //associate token to user
            //check if exists
            userToken.findOne({
                    where: {
                        token: token
                    }
                })
                .then(user => {
                    if (!user) {
                        //if not
                        userToken.create({
                                username: req.body.username,
                                token: token
                            })
                            .then(() => {
                                console.log('Token asociado exitosamente');
                            })
                            .catch(err => {
                                res.status(500).send({ message: err.message });
                            });
                    }
                });

            res.status(200).send({
                id: user.id,
                username: user.username,
                accessToken: token
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};