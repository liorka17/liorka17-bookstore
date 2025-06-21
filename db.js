const { MongoClient } = require('mongodb');
require('dotenv').config();

let dbConnection;

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect(process.env.DB_URL)
            .then((client) => {
                dbConnection = client.db(); // ברירת מחדל היא מה שיש ב־/bookstore
                cb();
            })
            .catch((err) => {
                console.error("❌ Error connecting to MongoDB:", err);
                cb(err);
            });
    },
    getDb: () => dbConnection
};
