const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'visittimorleste'
})

async function getConnection(){
    try{
        return await pool.getConnection();
    }
    catch(err){
        throw new Error(err);
    }
}

module.exports = {
    getConnection
}