const Resource = require("../types/Resource");

const canaltech = new Resource({
  title: "Canaltech",
  url: "https://canaltech.com.br",
  amount: 9,
  postTitlesSelector: "#most-readed span.title",
  postUrlsSelector: "#most-readed a.most-readed-item"
});

const exame = new Resource({
  title: "Exame",
  url: "https://exame.abril.com.br/",
  amount: 10,
  postTitlesSelector:
    ".sidebar .widget-popular-posts-item .widget-popular-posts-info a",
  postUrlsSelector: ".widget-popular-posts-info a"
});

const folha = new Resource({
  // mudar para https://www1.folha.uol.com.br/maispopulares/
  title: "Folha de SP",
  url: "https://www.folha.uol.com.br",
  amount: 5,
  postTitlesSelector: ".c-most-read__list li",
  postUrlsSelector: ".c-most-read__list a"
});

const twitter = new Resource({
  title: "Twitter",
  url: "https://twitter.com/i/moments",
  amount: 20,
  postTitlesSelector: ".MomentCapsuleSummary-title",
  postUrlsSelector: ".MomentCapsuleSummary-title",
  postImagesSelector: ".MomentMediaItem-entity--image"
});

const uol = new Resource({
  title: "Uol",
  url: "https://www.uol.com.br/",
  amount: 5,
  postTitlesSelector:
    ".mais-lidas-container .horizontal-chamada .content > span",
  postUrlsSelector: ".mais-lidas-container .horizontal-chamada a"
});

class TecmundoResource extends Resource {
  postImagesExtractor(params) {
    const { $, html } = params;
    const links = [];

    $(this.postImagesSelector, html).each(function(i, elem) {
      let url = $(this).attr("data-src");
      links[i] = url;
    });

    return links;
  }
}

const tecmundo = new TecmundoResource({
  title: "Tecmundo",
  url: "https://www.tecmundo.com.br/",
  amount: 12,
  postTitlesSelector: ".tec--carousel__item__title__link",
  postUrlsSelector: ".tec--carousel__item__title__link",
  postImagesSelector: ".tec--carousel__item__thumb__image"
});

class GazetaDoPovoResource extends Resource {
  postImagesExtractor(params) {
    const { $, html } = params;
    const links = [];

    $(this.postImagesSelector, html).each(function(i, elem) {
      let url = $(this).attr("data-srcset");
      links[i] = url;
    });

    return links;
  }
}

const gazetaDoPovo = new GazetaDoPovoResource({
  title: "Gazeta do Povo",
  url: "https://www.gazetadopovo.com.br",
  amount: 45,
  postTitlesSelector: "article div.description h2 a",
  postUrlsSelector: "article div.description h2 a",
  postImagesSelector: "article img"
});

module.exports = [
  canaltech,
  exame,
  folha,
  twitter,
  uol,
  tecmundo,
  gazetaDoPovo
].sort(() => Math.random() - Math.random());
