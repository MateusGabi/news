class Minion {
  constructor(name) {
    this.name = name;
    this.id = Math.random()
      .toString(36)
      .substring(2);
  }

  resolver(params) {
    throw new Error("Resolver function must be override");
  }

  log(message) {
    console.log("Minion #" + this.id + " says: ", message);
  }
}

module.exports = Minion;
