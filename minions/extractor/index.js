const $ = require("cheerio");
const Minion = require("../../types/Minion");

class PostsExtractor extends Minion {
  resolver({ html, resource }) {
    const titlesPromise = resource.postTitlesExtractor({ $, html });
    const urlsPromise = resource.postUrlsExtractor({ $, html });
    const imgPromise = resource.postImagesExtractor({ $, html });

    return Promise.all([titlesPromise, urlsPromise, imgPromise]).then(
      results => {
        const [titles, urls, images] = results;

        urls.forEach(url =>
          this.eventEmitter.emit("EXTRACT_POST_CONTENT", url)
        );

        const posts = new Array(resource.amount).fill().map((v, i) => ({
          title: titles[i],
          url: urls[i],
          img: images[i]
        }));

        return posts;
      }
    );
  }
}

module.exports = PostsExtractor;
