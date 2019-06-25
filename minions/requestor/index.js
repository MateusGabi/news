const rp = require("request-promise");
const Minion = require("../../types/Minion");

function DependencyInjector(injectObject) {
  return function(target) {
    Object.keys(injectObject).forEach(key => {
      target[key] = injectObject[key];
    });

    return target;
  };
}

class RequestorMinion extends Minion {
  resolver(params) {
    return this.httpRequestor(params.url);
  }
}

module.exports = DependencyInjector({ httpRequestor: rp })(
  new RequestorMinion()
);
