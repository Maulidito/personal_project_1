var express = require("express");
const multer = require("multer");
const auth = require("../middleware/auth");
const upload = multer({ dest: "public/uploads/images/" });
const fs = require("fs");

var router = express.Router();

const {
  RepositoryNews,
  RepositoryComment,
  GetNewsAndCountComment,
  GetAllCommentOnSpecificNews,
} = require("../service");

/* GET home page. */
router.get("/", auth, async function (req, res, next) {
  const data = await GetNewsAndCountComment();

  res.render("index", { data, user: req.user });
});

router.get("/add-news", auth, function (req, res, next) {
  res.render("form/form_add_news", {
    title: "",
    description: "",
    user: req.user,
  });
});

router.get("/view-news/:id", auth, async function (req, res, next) {
  try {
    const { id } = req.params;

    let number = Math.floor(Math.random() * 2) + 1;

    let data = await RepositoryNews.GetOne(id);
    let data_comment = await GetAllCommentOnSpecificNews(id);

    res.render("detail/detail_news", {
      ...data.dataValues,
      data_comment,
      number,
      user: req.user,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/add-comment/:id", auth, async function (req, res, next) {
  try {
    const { content, comment_tree_fk } = req.body;
    const { id } = req.params;

    let data = await RepositoryComment.Add({
      news_fk: id,
      content,
      comment_tree_fk,
      comment_user_fk: req.user ? req.user.id : null,
    });

    res.redirect(`/view-news/${id}`);
  } catch (error) {
    console.log(error);
  }
});

router.post(
  "/add-news",
  upload.single("file"),
  async function (req, res, next) {
    const { title, desc, file } = req.body;
    const path = req.file.path.substring(6);

    console.log("CHECK FILE", req.file);
    try {
      if (title === "") {
        throw new Error("title cannot be empty");
      }
      const result = await RepositoryNews.Add({
        title,
        description: desc,
        image: path,
      });
      res.redirect("/success-add-news");
      return;
    } catch (error) {
      res.redirect("/add-news");
      return;
    }
  }
);

router.get("/success-add-news", auth, function (req, res, next) {
  res.render("success", { user: req.user });
});

router.get("/edit-news/:id", auth, async function (req, res, next) {
  try {
    if (req.user == undefined) {
      res.redirect("/");
    }
    const { id } = req.params;

    const data = await RepositoryNews.GetOne(id);

    res.render("form/form_edit_news", {
      ...data.dataValues,
      user: req.user,
    });
  } catch (error) {}
});

router.post(
  "/edit-news",
  upload.single("file"),
  async function (req, res, next) {
    try {
      const { title, desc, id } = req.body;
      const path = req.file.path.substring(6);

      let result = await RepositoryNews.Update({
        title,
        description: desc,
        image: path,
        id,
      });

      res.redirect("/success-add-news");
      return;
    } catch (error) {
      console.log("ERROR", error);
      return;
    }
  }
);

router.get("/delete-news/:id", auth, async function (req, res, next) {
  try {
    const { id } = req.params;
    if (req.user == undefined) {
      res.redirect("/");
    }
    let result = await RepositoryNews.Delete(id);

    res.redirect("/success-add-news", { user: req.user });
    return;
  } catch (error) {
    console.log("ERROR", error);
    return;
  }
});

module.exports = router;
