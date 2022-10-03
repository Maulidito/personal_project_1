const db = require("../models");

const RepoNews = require("../repository/news");
const RepositoryNews = new RepoNews(db.news);
const RepoComment = require("../repository/comment");
const RepositoryComment = new RepoComment(db.comment);

module.exports = {
  RepositoryNews,
  RepositoryComment,
  GetNewsAndCountComment,
};

async function GetNewsAndCountComment() {
  let dataRes = [];
  let data = await RepositoryNews.getAll();
  for (let element = 0; element < data.length; element++) {
    let countComment = await RepositoryComment.getAllSpecificNews(
      data[element].id
    );
    dataRes.push({
      ...data[element].dataValues,
      countComment: countComment.length,
    });
  }

  return dataRes;
}
