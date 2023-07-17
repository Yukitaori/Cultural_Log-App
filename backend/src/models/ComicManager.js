const AbstractManager = require("./AbstractManager");

class ComicManager extends AbstractManager {
  constructor() {
    super({ table: "comic" });
  }

  insert(comic, userId) {
    return this.database.query(
      `insert into ${this.table} (title, artist, writer, read, is_read, rating, owned, is_lent, lent_to, user_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        comic.title,
        comic.artist,
        comic.writer,
        comic.read,
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
      `update ${this.table} set title = ?, artist = ?, writer = ?, read = ?, is_read = ?, rating = ?, owned = ?, is_lent = ?, lent_to = ?, user_id = ? where id = ?`,
      [
        comic.title,
        comic.artist,
        comic.writer,
        comic.read,
        comic.is_read,
        comic.rating,
        comic.owned,
        comic.is_lent,
        comic.lent_to,
        userId,
      ]
    );
  }
}

module.exports = ComicManager;
