const chalk = require("chalk");
const EventEmitter = require("events");

const resources = require("./resources");
const minions = require("./minions");

// TODO: move to /events
const EXTRACT_POST_CONTENT = "EXTRACT_POST_CONTENT";

function DependencyInjector(injectObject) {
  return function(target) {
    Object.keys(injectObject).forEach(key => {
      target[key] = injectObject[key];
    });

    return target;
  };
}

const minionEmitter = new EventEmitter();

minionEmitter.on(EXTRACT_POST_CONTENT, function(event) {
  const minion = DependencyInjector({ eventEmitter: minionEmitter })(
    new minions.PostContentExtractor()
  );
  minion.resolver(event);
});

minionEmitter.on("POST_EXTRACT", function(event) {
  console.log("mais um na lista!");
});

async function resolver() {
  return resources.reduce(async (acc, resource) => {
    const collection = await acc;

    const minionExtractor = DependencyInjector({ eventEmitter: minionEmitter })(
      new minions.PostsExtractor()
    );

    const html = await minions.requestor.resolver(resource);
    const posts = await minionExtractor.resolver({
      html,
      resource
    });

    const filteredPosts = minions.filter.resolver(posts);
    const imagedPosts = minions.addDefaultImage.resolver(filteredPosts);

    const json = minions.formatter({
      posts: imagedPosts,
      resource,
      type: "JSON"
    });

    collection.push(json);

    return collection;
  }, Promise.resolve([]));
}

// resolver();
module.exports = resolver;
