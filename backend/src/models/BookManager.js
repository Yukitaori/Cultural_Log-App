const AbstractManager = require("./AbstractManager");

class BookManager extends AbstractManager {
  constructor() {
    super({ table: "book" });
  }

  insert(book) {
    return this.database.query(`insert into ${this.table} (title) values (?)`, [
      book.title,
    ]);
  }

  update(book) {
    return this.database.query(
      `update ${this.table} set title = ? where id = ?`,
      [book.title, book.id]
    );
  }
}

module.exports = BookManager;
