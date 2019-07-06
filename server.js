const express = require("express");
const Cacher = require("cacher");

const sol = require("./index");
const app = express();

const cache = new Cacher(sol);

app.get("/api", async function(req, res) {
  const a = await cache.getData();
  res.json(a);
});

app.use("/", express.static("frontend"));

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
