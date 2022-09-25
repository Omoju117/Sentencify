const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

const cors = require("cors");
app.use(cors());

app.get("/", (req, res) => {
  res.send({ result: "this message has sent from backend!" });
  // fs.readFile("src/index.html", function (err, html) {
  //   if (err) {
  //     throw err;
  //   }
  //   res.writeHead(200, { "Content-Type": "text/html" });
  //   res.write(html);
  //   res.end();
  // });
});

app.get("/dashboard", (req, res) => {
  fs.readFile("src/dashboard.html", function (err, html) {
    if (err) {
      throw err;
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(html);
    res.end();
  });
});

app.get("/movies/:genre/year/:year", (req, res) => {
  const year = req.params.year;
  const genre = req.params.genre;
  res.send(`Genre: ${genre}, Year: ${year}`);
});

app.listen(PORT, () => console.log(`Server is running :PORT ${PORT}`));
