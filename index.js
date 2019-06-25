const chalk = require("chalk");
const resources = require("./resources");
const minions = require("./minions");

async function resolver() {
  resources.forEach(async resource => {
    const html = await minions.requestor.resolver(resource);
    const posts = await minions.extractor({
      html,
      resource
    });

    minions.formatter({ posts, resource, type: "" });
  });
}

resolver();
