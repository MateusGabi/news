class Resource {
  constructor(props) {
    this.title = props.title;
    this.url = props.url;
    this.amount = props.amount;
    this.postTitlesSelector = props.postTitlesSelector;
    this.postUrlsSelector = props.postUrlsSelector;
    this.postImagesSelector = props.postImagesSelector;
  }

  postTitlesExtractor(params) {
    const { $, html } = params;
    const titles = [];

    $(this.postTitlesSelector, html).each(function(i, elem) {
      titles[i] = $(this)
        .text()
        .replace("\n", "")
        .trim();
    });

    return titles;
  }

  postUrlsExtractor(params) {
    const { $, html } = params;
    const links = [];
    const that = this;

    $(this.postUrlsSelector, html).each(function(i, elem) {
      let url = $(this).attr("href");
      if (url.charAt(0) === "/") {
        url = that.url + url;
      }
      links[i] = url;
    });

    return links;
  }

  postImagesExtractor(params) {
    const { $, html } = params;
    const links = [];
    const that = this;

    $(this.postImagesSelector, html).each(function(i, elem) {
      let url = $(this).attr("src");
      if (url.charAt(0) === "/") {
        url = that.url + url;
      }
      links[i] = url;
    });

    return links;
  }
}

module.exports = Resource;
