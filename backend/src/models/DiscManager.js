const AbstractManager = require("./AbstractManager");

class DiscManager extends AbstractManager {
  constructor() {
    super({ table: "disc" });
  }

  insert(disc) {
    return this.database.query(`insert into ${this.table} (title) values (?)`, [
      disc.title,
    ]);
  }

  update(disc) {
    return this.database.query(
      `update ${this.table} set title = ? where id = ?`,
      [disc.title, disc.id]
    );
  }
}

module.exports = DiscManager;
