module.exports = class NewsRepository {
  constructor(db) {
    this.db = db;
  }

  async getAll() {
    let res = await this.db.findAll();

    return res;
  }

  async Add(data) {
    let res = null;

    res = await this.db.create({ ...data });

    return res;
  }

  async GetOne(id) {
    let res = await this.db.findOne({ where: { id } });

    return res;
  }

  async Delete(id) {
    let currentTime = new Date(Date.now()).toUTCString();
    let res = await this.db.update(
      { DeleteAt: currentTime },
      { where: { id } }
    );

    return res;
  }

  async Update(data) {
    let res = await this.db.update({ ...data }, { where: { id: data.id } });

    return res;
  }
};
