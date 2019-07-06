const chalk = require("chalk");
const resources = require("./resources");
const minions = require("./minions");

async function resolver() {
  return resources.reduce(async (acc, resource) => {
    const collection = await acc;
    const html = await minions.requestor.resolver(resource);
    const posts = await minions.extractor({
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
