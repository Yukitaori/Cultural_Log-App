const AbstractManager = require("./AbstractManager");

class ComicManager extends AbstractManager {
  constructor() {
    super({ table: "comic" });
  }

  insert(comic) {
    return this.database.query(`insert into ${this.table} (title) values (?)`, [
      comic.title,
    ]);
  }

  update(comic) {
    return this.database.query(
      `update ${this.table} set title = ? where id = ?`,
      [comic.title, comic.id]
    );
  }
}

module.exports = ComicManager;
