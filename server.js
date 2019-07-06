const express = require("express");
const Cacher = require("cacher");

const sol = require("./index");
const app = express();

const cache = new Cacher(sol);

class DB extends Map {
  set(key, value) {
    if (this.size > 10) {
      console.log("removing");

      this.delete(this.keys().next().value);
      console.log("new size", this.size);
    }
    console.log("adding", key);
    super.set(key, new Cacher(() => value));
  }
}

const db = new DB();

app.get("/api", async function(req, res) {
  const a = await cache.getData();
  res.json(a);
});

app.get("/api/story/:url", async function(req, res) {
  const contains = db.has(req.params.url);

  if (!contains) db.set(req.params.url, Math.random());

  res.json({
    url: req.params.url,
    contains
  });
});

app.use("/", express.static("frontend"));

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
