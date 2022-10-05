const db = require("../../models");

require("jest");

const {
  GetNewsAndCountComment,
  RepositoryNews,
  GetAllCommentOnSpecificNews,
  RepositoryComment,
} = require("../../service");

const News = db.news;

test.skip("Get Count Comment on Specific News", async () => {
  let dataRes = await GetNewsAndCountComment();

  console.log(dataRes);
});

test("Get all comment on specific News", async () => {
  const newsId = "7f8688e3-ee48-43c2-b631-1f6e2ea4c345";

  const res = await GetAllCommentOnSpecificNews(newsId);
  console.log("RES", res);
});
