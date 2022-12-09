const { Client } = require('pg')
const client = new Client({
    user: 'root',
    password: 'root',
    host: '127.0.0.1',
    port: 5432,
    database: 'test'
});
client
    .connect()
    .then(()=>console.log("connected"))
    .catch(err => console.error(err));

