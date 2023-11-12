class AbstractManager {
  constructor({ table }) {
    this.table = table;
  }

  find(id, userId) {
    return this.database.query(
      `select * from  ${this.table} where id = ? and user_id = ?`,
      [id, userId]
    );
  }

  findWithTitle(title, userId) {
    return this.database.query(
      `select id, title from  ${this.table} where title = ? and user_id = ?`,
      [title, userId]
    );
  }

  findWithPartTitle(title, userId) {
    return this.database.query(
      `select id, title from  ${this.table} where title like ? and user_id = ? order by title ASC`,
      [`%${title}%`, userId]
    );
  }

  findAll(item, userId) {
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
      `select id, title, rating, ${when}, ${is}, is_lent, owned from ${this.table} where user_id = ? order by title ASC`,
      [userId]
    );
  }

  delete(id, userId) {
    return this.database.query(
      `delete from ${this.table} where id = ? and user_id = ?`,
      [id, userId]
    );
  }

  setDatabase(database) {
    this.database = database;
  }
}

module.exports = AbstractManager;
