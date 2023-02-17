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

const documentService = require("./services/documentService");
app.get("/documentListItems", async (req, res) => {
  let params = req.query;
  console.log(params);
  const result = await documentService.getDocuments(params.userId);
  res.send(result);
});

app.get("/document", async (req, res) => {
  let params = req.query;
  console.log(params);
  const result = await documentService.getDocument(params);
  console.log(result);
  res.send(result);
});

app.post("/document", async (req, res) => {
  let data = req.body;
  console.log(data);
  const result = await documentService.createDocument(data.userId);
  console.log("post result", result);
  res.send(result);
});

app.put("/document", async (req, res) => {
  let document = req.body;
  console.log(document);
  const result = await documentService.updateDocument(document);
  console.log("upt result", result);
  res.send({ message: "Data Received", data: result });
});

app.listen(PORT, () => console.log(`Server is running :PORT ${PORT}`));
