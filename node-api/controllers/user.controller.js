const db = require("../models");
const userHistory = db.userHistory;
const userToken = db.userToken;

let username = "";
exports.operation = async(req, res) => {
    var results = await userToken.findOne({
            where: {
                token: req.headers["x-access-token"]
            }
        })
        .then(user => {
            if (!user) {
                res.status(500).send({ message: "Token No Asociado" });
            } else {
                username = user.username;
            }
        });
    if (username == "") {
        return;
    }
    switch (req.body.operacion) {
        case 'suma':
            console.log("Username:", username);
            var result = req.body.valores.reduce(function(a, b) {
                return a + b;
            });

            userHistory.create({
                username: username,
                operation: req.body.operacion,
                operationvalues: req.body.valores.toString(),
                operationresult: result
            });

            res.status(200).send({
                operacion: req.body.operacion,
                valores: req.body.valores,
                resultado: result
            });
            break;
        default:
            return res.status(404).send({ message: `Operacion [${req.body.operacion}]no permitida` });
            break;
    }
};

exports.allAccess = (req, res) => {
    let username = req.body.username;

    if (!username) {
        return res.status(403).send({
            message: "No se incluye key [username]"
        });
    }
    userHistory.findAll({
            where: {
                username: req.body.username
            },
            attributes: ['username', 'operation', 'operationresult', ['createdAt', 'timestamp']]
        })
        .then(user => {
            return res.status(404).send({ message: user });
        });
};

exports.logout = (req, res) => {
    userToken.destroy({
        where: {
            token: req.headers["x-access-token"]
        }
    })
    res.status(200).send({
        message: "Sesión Cerrada"
    });

};