const db = require("../../models");
let NewsRepository = require("../../repository/news");
require("jest");
const News = db.news;

let repoNews = new NewsRepository(News);

let temporaryData = null;

test("should Get All News", async () => {
  const data = await repoNews.getAll();
});

test("Add data news to database", async () => {
  const dataNews = {
    title: "test",
    description: "data",
  };
  const data = await repoNews.Add(dataNews);
  temporaryData = data;
});

test("Update Data database", async () => {
  let dataNew = {
    ...temporaryData.dataValues,
    title: "testUbah",
  };

  const data = await repoNews.Update(dataNew);
});

test("Delete Data database", async () => {
  const data = await repoNews.Delete(temporaryData.id);
  console.log("TEST4", data);
});
