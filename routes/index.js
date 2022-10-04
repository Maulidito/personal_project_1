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

router.get("/view-news/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    let number = Math.floor(Math.random() * 2) + 1;

    let data = await RepositoryNews.GetOne(id);
    let data_comment = await RepositoryComment.getAllTopSpecificNews(id);

    res.render("detail/detail_news", {
      ...data.dataValues,
      data_comment,
      number,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/add-comment/:id", async function (req, res, next) {
  try {
    const { content } = req.body;
    const { id } = req.params;

    let data = await RepositoryComment.Add({ news_fk: id, content });

    res.redirect(`/view-news/${id}`);
  } catch (error) {
    console.log(error);
  }
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

    res.render("form_edit_news", {
      ...data.dataValues,
    });
  } catch (error) {}
});

router.post("/edit-news", async function (req, res, next) {
  try {
    const { title, desc, file, id } = req.body;

    let result = await RepositoryNews.Update({
      title,
      description: desc,
      image: null,
      id,
    });

    res.redirect("/success-add-news");
    return;
  } catch (error) {
    console.log("ERROR", error);
    return;
  }
});

router.get("/delete-news/:id", async function (req, res, next) {
  try {
    const { id } = req.params;

    let result = await RepositoryNews.Delete(id);

    res.redirect("/success-add-news");
    return;
  } catch (error) {
    console.log("ERROR", error);
    return;
  }
});

module.exports = router;
