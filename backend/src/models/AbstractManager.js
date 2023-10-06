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

  findAll() {
    return this.database.query(
      `select * from  ${this.table}  order by title ASC`
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
