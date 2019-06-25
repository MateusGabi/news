class Minion {
  constructor(name) {
    this.name = name;
  }

  resolver(params) {
    throw new Error("Resolver function must be override");
  }
}

module.exports = Minion;
