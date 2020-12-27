const db = require("../models");
const User = db.user;

checkDuplicateUsername = (req, res, next) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: `ERROR: Nombre de usuario [${req.body.username}] Ya existe`
            });
            return;
        }
        next();
    });
};

const verifySignUp = {
    checkDuplicateUsername: checkDuplicateUsername
};

module.exports = verifySignUp;