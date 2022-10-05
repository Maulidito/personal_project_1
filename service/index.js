const db = require("../models");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const RepoNews = require("../repository/news");
const RepositoryNews = new RepoNews(db.news);
const RepoComment = require("../repository/comment");
const RepositoryComment = new RepoComment(db.comment);
const RepoUser = require("../repository/user");
const RepositoryUser = new RepoUser(db.user);

const fs = require("fs");
const { emitWarning } = require("process");
const { PRIVATE_KEY } = require("../constant/key");

module.exports = {
  RepositoryNews,
  RepositoryComment,
  RepositoryUser,
  GetNewsAndCountComment,
  RegisUser,
  LoginUser,
  GetAllCommentOnSpecificNews,
};

async function GetAllCommentOnSpecificNews(idnews) {
  const res = await RepositoryComment.getAllTopSpecificNews(idnews);

  let commentFull = [];

  for (let element = 0; element < res.length; element++) {
    let nested = await RepositoryComment.getAllNestedComment(
      idnews,
      res[element].id
    );
    commentFull.push({ ...res[element], nested });
  }

  // await res.forEach(async (element,) => {
  //   let nested = await RepositoryComment.getAllNestedComment(
  //     idnews,
  //     element.id
  //   );
  //   commentFull.push({ ...element, nested });
  // });

  return commentFull;
}

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

async function hashingProcess(data) {
  let salt = await bcrypt.genSalt(8);
  let passEncrypted = await bcrypt.hash(data, salt);
  return passEncrypted;
}

async function RegisUser(email, pass) {
  let isEmailExist = await RepositoryUser.GetOnebyEmail(email);

  if (isEmailExist != null) {
    throw Error("EMAIL EXIST");
    return;
  }

  const passEncrypted = await hashingProcess(pass);

  let data = await RepositoryUser.Add({ email, password: passEncrypted });

  return data;
}

async function LoginUser(email, pass) {
  let data = await RepositoryUser.GetOnebyEmail(email);

  if (data == null) {
    throw Error("EMAIL DIDNT EXIST");
    return;
  }

  const isOk = await bcrypt.compare(pass, data.password);
  const payload = { email: email, timeLogin: Date.now() };

  const token = jwt.sign(payload, PRIVATE_KEY);

  return { isOk, token };
}
