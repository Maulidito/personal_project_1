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
  res.render("form_add_news", { title: "", description: "" });
});

router.get("/view-news/:id", function (req, res, next) {
  const { id } = req.params;
  let number = Math.floor(Math.random() * 2) + 1;
  console.log("CHECK NUMBER", number);

  res.render("detail/detail_news", {
    id,
    number,
  });
});

router.post("/add-news", async function (req, res, next) {
  const { title, desc, file } = req.body;

  try {
    if (title === "") {
      throw new Error("title cannot be empty");
    }
    const result = await RepositoryNews.Add({
      title,
      description: desc,
      image: null,
    });
    res.redirect("/success-add-news");
    return;
  } catch (error) {
    res.redirect("/add-news");
    return;
  }
});

router.get("/success-add-news", function (req, res, next) {
  res.render("success");
});

router.get("/edit-news/:id", async function (req, res, next) {
  try {
    const { id } = req.params;

    const data = await RepositoryNews.GetOne(id);
    console.log("CHECK ", data.description);
    res.render("form_edit_news", {
      ...data.dataValues,
    });
  } catch (error) {}
});

router.post("/edit-news", async function (req, res, next) {
  try {
    const { title, desc, file } = req.body;

    let result = await RepositoryNews.Update({
      title,
      description: desc,
      image: null,
    });

    res.redirect("/success-add-news");
    return;
  } catch (error) {
    return;
  }
});

module.exports = router;
