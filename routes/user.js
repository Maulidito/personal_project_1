var express = require("express");
const auth = require("../middleware/auth");

var router = express.Router();

const { RepositoryUser, RegisUser, LoginUser } = require("../service");

/* GET home page. */
router.get("/", async function (req, res, next) {
  res.render("form/form_login", { user: req.user });
});

router.get("/regis", async function (req, res, next) {
  res.render("form/form_regis", { user: req.user });
});

router.post("/", async function (req, res, next) {
  try {
    const { email, pass } = req.body;

    const { isOk, token } = await LoginUser(email, pass);

    if (isOk) {
      res.cookie("token", token, {
        expires: new Date(Date.now() + 900000),
        httpOnly: true,
      });

      res.redirect("/");
      return;
    }

    res.redirect("/user");
    return;
  } catch (error) {
    console.log("CHECK ERROR", error);
    res.send({ error });
  }
});

router.post("/regis", async function (req, res, next) {
  try {
    const { email, pass } = req.body;

    let data = await RegisUser(email, pass);
    res.redirect("/success-add-news");
    return;
  } catch (error) {
    res.send(error);
  }
});
router.get("/logout", auth, async function (req, res, next) {
  try {
    res.clearCookie("token");
    res.redirect("/");
    return;
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
