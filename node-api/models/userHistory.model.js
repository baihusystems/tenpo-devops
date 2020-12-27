module.exports = (sequelize, Sequelize) => {
    const userHistory = sequelize.define("usershistory", {
        username: {
            type: Sequelize.STRING
        },
        operation: {
            type: Sequelize.STRING
        },
        operationvalues: {
            type: Sequelize.STRING
        },
        operationresult: {
            type: Sequelize.INTEGER
        }

    });

    return userHistory;
};