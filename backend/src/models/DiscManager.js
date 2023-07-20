const AbstractManager = require("./AbstractManager");

class DiscManager extends AbstractManager {
  constructor() {
    super({ table: "disc" });
  }

  findDiscWithPartTitle(title) {
    return this.database.query(
      `select id, title from  ${this.table} where title like ? order by title ASC`,
      [`%${title}%`]
    );
  }

  findDiscWithTitle(title) {
    return this.database.query(
      `select id, title from  ${this.table} where title = ?`,
      [title]
    );
  }

  insert(disc, userId) {
    return this.database.query(
      `insert into ${this.table} (title, artist, when_listened, is_listened, rating, owned, is_lent, lent_to, user_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        disc.title,
        disc.artist,
        disc.when_listened,
        disc.is_listened,
        disc.rating,
        disc.owned,
        disc.is_lent,
        disc.lent_to,
        userId,
      ]
    );
  }

  update(disc, userId) {
    return this.database.query(
      `update ${this.table} set title = ?, artist = ?, when_listened = ?, is_listened = ?, rating = ?, owned = ?, is_lent = ?, lent_to = ?, user_id = ? where id = ?`,
      [
        disc.title,
        disc.artist,
        disc.when_listened,
        disc.is_listened,
        disc.rating,
        disc.owned,
        disc.is_lent,
        disc.lent_to,
        userId,
        disc.id,
      ]
    );
  }
}

module.exports = DiscManager;
