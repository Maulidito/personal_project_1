const db = require("../../models");

require("jest");

const { GetNewsAndCountComment, RepositoryNews } = require("../../service");

const News = db.news;

test("Get Count Comment on Specific News", async () => {
  let dataRes = await GetNewsAndCountComment();

  console.log(dataRes);
});
