const express = require("express");
const axios = require("axios");
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

app.post("/translation", async (req, res) => {
  let data = req.body;
  let result = "";

  if (data.text && data.target_lang) {
    const config = {
      headers: {
        // TODO: fix it to get from env
        Authorization: "DeepL-Auth-Key e7dcc2ce-19c3-8503-c4b6-9589e552f0a9:fx",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    const params = {
      text: data.text,
      target_lang: data.target_lang,
    };

    console.log("params", params);
    await axios
      .post("https://api-free.deepl.com/v2/translate", params, config)
      .then((res) => {
        result = res.data;
        console.log("translation res at back", res.data.text);
      })
      .catch((err) => {
        console.log("error in translation request", err);
      });
  }

  res.send(result);
});

app.listen(PORT, () => console.log(`Server is running :PORT ${PORT}`));
