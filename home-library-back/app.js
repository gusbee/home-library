const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let connect = require("./connection.js");

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
})

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

// Search if user account exists
app.post("/sign-up", async (req, res, next) => {

    let { db_client, db_connection } = await connect();
    
    db_connection.collection("users").findOne({ email: req.body.email }, (err, result) => {
        if (err) throw err;

        db_client.close();
        if (result === null) {
            next();
        } else {
            res.send("exists");
        }
    })
});

// Add new user account in database
app.post("/sign-up", async (req, res) => {

    let { db_client, db_connection } = await connect();

    db_connection.collection("users").insertOne({ ...req.body, books: [] }, (err, result) => {
        if (err) throw err;

        db_client.close();
        res.send("create");
    });
});

// Sign in with user account
app.post("/sign-in", async (req, res) => {

    let { db_client, db_connection } = await connect();

    db_connection.collection("users").findOne({ email: req.body.email }, (err, result) => {
        if (err) throw err;

        db_client.close();

        if (result === null) {
            res.send("no account");
        } else {
            if ( req.body.password === result.password ) {
                res.send("signed in");
            } else {
                res.send("wrong password");
            }
        }
    });
});

// Update the user's library
app.post("/update-library", async (req, res) => {

    let { db_client, db_connection } = await connect();

    db_connection.collection("users").updateOne(
        { email: req.body.email },
        { $set: { books: req.body.data }}, (err, result) => {
            if (err) throw err;

            db_client.close();
            res.send("library updated");
        })
});

// Get the user's library
app.post("/library", async (req, res) => {

    let { db_client, db_connection } = await connect();

    console.log(req.body);

    db_connection.collection("users").findOne({...req.body}, (err, result) => {
        if (err) throw err;

        db_client.close();
        res.send(result.books);
    });
});

app.use("/", (req, res) => {
    res.send("Welcome in Home Library database !");
})



module.exports = app;