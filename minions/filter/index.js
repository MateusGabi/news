const Minion = require("../../types/Minion");

class FilterMinion extends Minion {
  resolver(params) {
    return params.filter(posts => Boolean(posts.url));
  }
}

module.exports = new FilterMinion();
