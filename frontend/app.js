var GabiJS = window.GabiJS;

var MyApp = new GabiJS.App({
  name: "My App"
});

var story = new GabiJS.Component({
  app: MyApp,
  el: "#story",
  debug: true,
  state: {
    storyUrl: ""
  },
  on: {
    changeStore: function(store) {
      this.setState({ storyUrl: store.storyUrl });
      var link = document.getElementById("news");
      link.style.display = "none"; //or
      link.style.visibility = "hidden";
    }
  },
  template: function() {
    const url = this.state.storyUrl;

    if (!url) return null;

    return `
      <div>
        <div style="
        max-height: 4rem;
        background: deeppink;
        color: aliceblue;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 1rem;
    "><a href="/" style="
    color: aliceblue;
    text-decoration: none;
    cursor: pointer;
"/>Done</a></div>
        <div>
          <iframe src="${this.state.storyUrl}" style="
          border: 0;
          width: -webkit-fill-available;
          height: calc(100vh - 4rem);
      " />
        </div>
      </div>
    `;
  }
});

var posts = new GabiJS.Component({
  app: MyApp,
  debug: true,
  el: "#news",
  state: { news: [], loading: true },
  on: {
    click: function(a) {
      const storyUrl = a.target.attributes["data-href"].value;
      this.setStore({ storyUrl });
    },
    changeStore: function(store) {}
  },
  onCreate: function() {
    fetch("/api")
      .then(res => res.json())
      .then(news => this.setState({ news, loading: false }));
  },
  template: function() {
    if (this.state.loading) return "loading";

    var count = this.state.news.length;
    if (count < 1) return "Not news found";
    else
      return `
        <h1>Providers</h1>
        ${this.state.news.map(provider => {
          return `
                <h2>${provider.title}</h2>
                <ol style="
                list-style: none;
                display: flex;
                /* flex-wrap: wrap; */
                justify-content: space-between;
                -webkit-overflow-scrolling:touch;
                overflow-x: scroll;
                ">
                ${provider.posts.map(news => {
                  return `<li style="max-width: 20rem;min-width: 20rem;padding-right: 1rem;"><a data-href="${
                    news.url
                  }" target="_blank" style="
                  text-decoration: none;
                  color: deeppink;
              ">
                    <div data-href="${news.url}" style="background-image: url(${
                    news.img
                  }); height: 10rem; background-position: center;background-repeat: no-repeat;background-size: cover;border-radius:1rem;">
                    
                    </div>
                    <h3 data-href="${news.url}" >${news.title}</h3>
                  </a></li>`;
                })}
                </ol>
            `;
        })}
    `;
  }
});
