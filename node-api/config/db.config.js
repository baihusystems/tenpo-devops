module.exports = {
    HOST: process.env.TENPO_ENV == 'prod' ? process.env.TENPO_DB_IP : "35.227.21.57",
    USER: process.env.TENPO_ENV == 'prod' ? process.env.TENPO_DB_USER : "dbadmin",
    PASSWORD: process.env.TENPO_ENV == 'prod' ? process.env.TENPO_DB_PASSW : "3353373723f594a1",
    DB: process.env.TENPO_ENV == 'prod' ? process.env.TENPO_DB : "postgres",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};