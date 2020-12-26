const ronin = require('ronin-server');
const mocks = require('ronin-mocks');

const server = ronin.server();

const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: '34.69.155.244',
    database: 'postgres',
    password: 'postgres',
    port: 5432,
});

let query = () => {
    setInterval(() => {
        pool.query('SELECT NOW()', (err, res) => {
            console.log(err, res);
        })
    }, 5000);
};

query();

server.use('/', mocks.server(server.Router(), false, true));
server.start();