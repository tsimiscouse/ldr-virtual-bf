module.exports = {
  aku: "kamu",
  saya: "kamu",
  kamu: "aku",
  mu: "ku",
  ku: "mu",
  i: "you",
  you: "i",
  my: "your",
  your: "my",
  mine: "yours",
  yours: "mine",
  me: "you",
};

function reflect(input) {
  return input.split(" ").map(word => module.exports[word.toLowerCase()] || word).join(" ");
}

module.exports.reflect = reflect;