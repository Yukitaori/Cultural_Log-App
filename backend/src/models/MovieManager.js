const AbstractManager = require("./AbstractManager");

class MovieManager extends AbstractManager {
  constructor() {
    super({ table: "movie" });
  }

  insert(movie) {
    return this.database.query(`insert into ${this.table} (title) values (?)`, [
      movie.title,
    ]);
  }

  update(movie) {
    return this.database.query(
      `update ${this.table} set title = ? where id = ?`,
      [movie.title, movie.id]
    );
  }
}

module.exports = MovieManager;
