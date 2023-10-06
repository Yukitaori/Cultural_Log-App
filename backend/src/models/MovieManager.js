const AbstractManager = require("./AbstractManager");

class MovieManager extends AbstractManager {
  constructor() {
    super({ table: "movie" });
  }

  insert(movie, userId) {
    return this.database.query(
      `insert into ${this.table} (title, director, when_seen, is_seen, rating, owned, is_lent, lent_to, user_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        movie.title,
        movie.director,
        movie.when_seen,
        movie.is_seen,
        movie.rating,
        movie.owned,
        movie.is_lent,
        movie.lent_to,
        userId,
      ]
    );
  }

  update(movie, userId) {
    return this.database.query(
      `update ${this.table} set title = ?, director = ?, when_seen = ?, is_seen = ?, rating = ?, owned = ?, is_lent = ?, lent_to = ?, user_id = ? where id = ?`,
      [
        movie.title,
        movie.director,
        movie.when_seen,
        movie.is_seen,
        movie.rating,
        movie.owned,
        movie.is_lent,
        movie.lent_to,
        userId,
        movie.id,
      ]
    );
  }
}

module.exports = MovieManager;
