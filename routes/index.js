var express = require("express");

var router = express.Router();

const {
  RepositoryNews,
  RepositoryComment,
  GetNewsAndCountComment,
} = require("../service");

/* GET home page. */
router.get("/", async function (req, res, next) {
  const data = await GetNewsAndCountComment();

  res.render("index", { data });
});

router.get("/add-news", function (req, res, next) {
  res.render("form");
});

module.exports = router;
