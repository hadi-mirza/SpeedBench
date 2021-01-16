function index(req, res, next) {
  let userIp = req.ip
  res.render("index", {userIp});
}

module.exports = {
  index,
};
