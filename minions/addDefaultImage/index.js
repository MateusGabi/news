const Minion = require("../../types/Minion");

const DEFAULT =
  "https://gruponiltonlins.com.br/midia/wp-content/themes/photobook/images/blank.png";

class AddDefaultImageMinion extends Minion {
  resolver(params) {
    return params.map(post => ({
      ...post,
      img: post.img || DEFAULT
    }));
  }
}

module.exports = new AddDefaultImageMinion();
