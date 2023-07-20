const AbstractManager = require("./AbstractManager");

class ComicManager extends AbstractManager {
  constructor() {
    super({ table: "comic" });
  }

  findComicWithTitle(title) {
    return this.database.query(
      `select id, title from  ${this.table} where title like ?`,
      [`%${title}%`]
    );
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
      `update ${this.table} set title = ?, artist = ?, writer = ?, when_read = ?, is_read = ?, rating = ?, owned = ?, is_lent = ?, lent_to = ?, user_id = ? where id = ?`,
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
      ]
    );
  }
}

module.exports = ComicManager;
