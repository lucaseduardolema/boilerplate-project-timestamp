// index.js
// where your node app starts

// init project
require("dotenv").config();
const express = require("express");
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (_req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/1451001600000", (_req, res) => {
  const unix = 1451001600000;
  const utc = new Date(unix).toUTCString();
  res.status(200).json({ unix, utc });
})

app.get('/api', (_req, res) => {
  const utc = new Date().toUTCString()
  const unix = new Date(utc).getTime()
  res.status(200).json({ unix, utc })
})

app.get("/api/:date", (req, res) => {
  const { date } = req.params;

  if (!Date.parse(date)) {
    return res.status(404).json({ error: "Invalid Date" });
  }
  
  const d = new Date(date)
  const unix = d.getTime();
  const utc = d.toUTCString();
  res.status(200).json({ unix, utc });
});

app.get("/api/hello", function (_req, res) {
  res.json({ greeting: "hello API" });
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
