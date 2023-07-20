const AbstractManager = require("./AbstractManager");

class BookManager extends AbstractManager {
  constructor() {
    super({ table: "book" });
  }

  findBookWithTitle(title) {
    return this.database.query(
      `select id, title from  ${this.table} where title like ?`,
      [`%${title}%`]
    );
  }

  insert(book, userId) {
    return this.database.query(
      `insert into ${this.table} (title, author, when_read, is_read, rating, owned, is_lent, lent_to, user_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        book.title,
        book.author,
        book.when_read,
        book.is_read,
        book.rating,
        book.owned,
        book.is_lent,
        book.lent_to,
        userId,
      ]
    );
  }

  update(book, userId) {
    return this.database.query(
      `update ${this.table} set title = ?, author = ?, when_read = ?, is_read = ?, rating = ?, owned = ?, is_lent = ?, lent_to = ?, user_id = ? where id = ?`,
      [
        book.title,
        book.author,
        book.when_read,
        book.is_read,
        book.rating,
        book.owned,
        book.is_lent,
        book.lent_to,
        userId,
        book.id,
      ]
    );
  }
}

module.exports = BookManager;
