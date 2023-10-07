class AbstractManager {
  constructor({ table }) {
    this.table = table;
  }

  find(id) {
    return this.database.query(`select * from  ${this.table} where id = ?`, [
      id,
    ]);
  }

  findWithTitle(title) {
    return this.database.query(
      `select id, title from  ${this.table} where title = ?`,
      [title]
    );
  }

  findWithPartTitle(title) {
    return this.database.query(
      `select id, title from  ${this.table} where title like ? order by title ASC`,
      [`%${title}%`]
    );
  }

  findAll(item) {
    let when;
    switch (item) {
      case "movies":
        when = "when_seen";
        break;
      case "discs":
        when = "when_listened";
        break;
      default:
        when = "when_read";
        break;
    }
    let is;
    switch (item) {
      case "movies":
        is = "is_seen";
        break;
      case "discs":
        is = "is_listened";
        break;
      default:
        is = "is_read";
        break;
    }

    return this.database.query(
      `select id, title, rating, ${when}, ${is}, is_lent, owned from ${this.table} order by title ASC`
    );
  }

  delete(id) {
    return this.database.query(`delete from ${this.table} where id = ?`, [id]);
  }

  setDatabase(database) {
    this.database = database;
  }
}

module.exports = AbstractManager;
