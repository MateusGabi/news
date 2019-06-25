const chalk = require("chalk");

function resolver({ posts, resource, type }) {
  if (type === "JSON") {
    console.log(JSON.stringify({ title: resource.title, posts }));
    return;
  }

  console.log("\n--------------------");
  console.log(resource.title);
  console.log("--------------------\n");

  posts.forEach((value, index) => {
    console.log(chalk.bold(`${index + 1}. ${value.title}`));
    console.log(chalk.gray(value.url));
  });
}

// const Minion = require("../../types/Minion");

// class FormatterMinion extends Minion {
//   constructor(props) {
//     super("FormatterMinion");
//   }
// }

module.exports = resolver;
