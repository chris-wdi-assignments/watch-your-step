const index = function (req, res) {
  res.send("This will show all incidents.");
}

const show = function (req, res) {
  res.send("this will show a single incident.");
}

const create = function (req, res) {
  res.send("This will create a new incident");
}

const update = function (req, res) {
  res.send("This will update a single incident.");
}

const destroy = function (req, res) {
  res.send("This will destroy a single incident.");
}

module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};