const $ = require("cheerio");

function resolver({ html, resource }) {
  const titlesPromise = resource.postTitlesExtractor({ $, html });
  const urlsPromise = resource.postUrlsExtractor({ $, html });

  return Promise.all([titlesPromise, urlsPromise]).then(results => {
    const [titles, urls] = results;
    const posts = new Array(resource.amount).fill().map((v, i) => ({
      title: titles[i],
      url: urls[i]
    }));

    return posts;
  });
}

module.exports = resolver;
