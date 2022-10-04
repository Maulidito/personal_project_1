const db = require("../../models");
let CommentRepository = require("../../repository/comment");
require("jest");
const Comment = db.comment;

let repoComment = new CommentRepository(Comment);

let temporaryData = null;

test("should Get All Comment", async () => {
  const data = await repoComment.getAll();
});

test.skip("Add data Comment to database", async () => {
  const dataComment = {
    content: "test",
    news_fk: "052c68ec-d51f-4beb-a44c-5e32b6afe35f",
  };
  const data = await repoComment.Add(dataComment);
  temporaryData = data;
});

test.skip("Add data Tree Comment to database", async () => {
  const dataComment = {
    content: "test",
    news_fk: "052c68ec-d51f-4beb-a44c-5e32b6afe35f",
    comment_tree_fk: "522f1b77-593c-4690-9bab-9b747ee75be1",
  };
  const data = await repoComment.Add(dataComment);
  temporaryData = data;
});

test.skip("Update Data database", async () => {
  let dataNew = {
    ...temporaryData.dataValues,
    title: "testUbah",
  };

  const data = await repoComment.Update(dataNew);
});

test.skip("Delete Data database", async () => {
  const data = await repoComment.Delete(temporaryData.id);
  console.log("TEST4", data);
});

test.skip("Get Comment specific Data", async () => {
  const data = await repoComment.getAllSpecificNews(
    "052c68ec-d51f-4beb-a44c-5e32b6afe35f"
  );
});

test("Get TOP Comment specific Data", async () => {
  const data = await repoComment.getAllTopSpecificNews(
    "052c68ec-d51f-4beb-a44c-5e32b6afe35f"
  );
  console.log("TOP COMMENT", data);
});
