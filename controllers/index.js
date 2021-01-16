function index(req, res, next) {
  res.render("index");
  console.log(req.ip)
}

module.exports = {
  index,
};
