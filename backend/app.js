const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

const cors = require("cors");
app.use(cors());

const mysql = require("mysql");
const { json } = require("stream/consumers");

const connection = mysql.createConnection({
  host: "sentence-writer-db",
  user: "root",
  password: "mypassword",
  database: "testdb",
});

connection.connect((err) => {
  if (err) {
    console.log("error connecting: " + err.stack);
    return;
  }
  console.log("success");
});

app.get("/connect", (req, res) => {
  connection.query("SELECT * FROM ", (error, results) => {
    console.log(results);
    res.send("successfully connected");
  });
});

app.get("/", (req, res) => {
  res.send({ result: "this message has sent from backend!" });
});

app.post("/document", (req, res) => {
  let data = req.body;
  console.log(data);
  console.log("post has been received");
  res.send("Data Received: ");
});

app.listen(PORT, () => console.log(`Server is running :PORT ${PORT}`));
