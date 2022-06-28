const express = require("express");
const mysql = require("mysql");

const db = mysql.createConnection({
    host    : 'localhost',
    user    : 'root',
    password: 'password',
    database: 'crypto_data',
    multipleStatements: true
})

db.connect();

const port = process.env.PORT || 8080;

const app = express()
    //Proxy
    .use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        next();
    })
    .use(express.json());

app.listen(port, () => {
    console.log(`Crypto REST API listening on port ${port}`);
});

//Basic GET request on root to check functionality
app.get("/", async (req, res) => {
    res.json({ status: "Crypto REST API is running." })
});

//GET request that returns date/price of crypto data for BTC (used for testing)
app.get("/data/bitcoin", (req, res, next) => {
    db.query(
        'SELECT * FROM bitcoin',
        (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).json({status: 'error'});
            } else {
                res.status(200).json(results);
            }
        }
    );
});

//GET request that returns date/price of crypto data for all coins
app.get("/data/all", (req, res, next) => {
    var sql_string = 'SELECT * FROM bitcoin;';
    sql_string += 'SELECT * FROM ethereum;';

    db.query(
        sql_string,
        (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).json({status: 'error'});
            } else {
                res.status(200).send(results);
            }
        }
    );
});

