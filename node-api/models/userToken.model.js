module.exports = (sequelize, Sequelize) => {
    const user_token = sequelize.define("userstokens", {
        username: {
            type: Sequelize.STRING
        },
        token: {
            type: Sequelize.STRING
        }
    });

    return user_token;
};