const $ = require("cheerio");
const Minion = require("../../types/Minion");
const RequestorMinion = require("../requestor");

class PostExtractorMinion extends Minion {
  async resolver(url) {
    const html = await RequestorMinion.resolver({ url });

    const title = $(".title", html).text();
    const text = $("article .content p", html).text();

    this.eventEmitter.emit("POST_EXTRACT", {
      key: url,
      value: {
        url,
        title,
        text
      }
    });
  }
}

module.exports = PostExtractorMinion;
