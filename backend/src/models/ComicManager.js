const AbstractManager = require("./AbstractManager");

class ComicManager extends AbstractManager {
  constructor() {
    super({ table: "comic" });
  }

  insert(comic, userId) {
    return this.database.query(
      `insert into ${this.table} (title, artist, writer, when_read, is_read, rating, owned, is_lent, lent_to, user_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        comic.title,
        comic.artist,
        comic.writer,
        comic.when_read,
        comic.is_read,
        comic.rating,
        comic.owned,
        comic.is_lent,
        comic.lent_to,
        userId,
      ]
    );
  }

  update(comic, userId) {
    return this.database.query(
      `update ${this.table} set title = ?, artist = ?, writer = ?, when_read = ?, is_read = ?, rating = ?, owned = ?, is_lent = ?, lent_to = ?, user_id = ? where id = ? and user_id = ?`,
      [
        comic.title,
        comic.artist,
        comic.writer,
        comic.when_read,
        comic.is_read,
        comic.rating,
        comic.owned,
        comic.is_lent,
        comic.lent_to,
        userId,
        comic.id,
        userId,
      ]
    );
  }
}

module.exports = ComicManager;
