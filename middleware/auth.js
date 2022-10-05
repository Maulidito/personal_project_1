const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("../constant/key");
const { RepositoryUser } = require("../service");

async function auth(req, res, next) {
  try {
    const { token } = req.cookies;
    if (token === undefined) {
      next();
      return;
    }
    const { email } = jwt.verify(token, PRIVATE_KEY);
    const user = await RepositoryUser.GetOnebyEmail(email);
    if (user != null) {
      req.user = { email: user.email };
    }
  } catch (error) {}

  next();
}

module.exports = auth;
