const $ = require("cheerio");

function resolver({ html, resource }) {
  const titlesPromise = resource.postTitlesExtractor({ $, html });
  const urlsPromise = resource.postUrlsExtractor({ $, html });
  const imgPromise = resource.postImagesExtractor({ $, html });

  return Promise.all([titlesPromise, urlsPromise, imgPromise]).then(results => {
    const [titles, urls, images] = results;
    const posts = new Array(resource.amount).fill().map((v, i) => ({
      title: titles[i],
      url: urls[i],
      img: images[i]
    }));

    return posts;
  });
}

module.exports = resolver;
