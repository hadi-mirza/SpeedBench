function index(req, res, next) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  res.render("index", {userIp, ip});
}

module.exports = {
  index,
};
