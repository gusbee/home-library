const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://maxime:L-143abc!@homelibrary-cu7et.azure.mongodb.net/test?authSource=admin&replicaSet=homeLibrary-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";

const connect = () => {

    let db_client;
    let db_connection;

    return new Promise((resolve, reject) => {
        MongoClient.connect(uri, {useUnifiedTopology: true}, function (err, client) {
            if (err) {
                reject(err)
            }

            db_client = client;
            db_connection = client.db("homeLibrary");
            resolve({ db_client, db_connection })
        });
    });
}

module.exports = connect;