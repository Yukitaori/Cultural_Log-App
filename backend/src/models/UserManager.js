const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  findByPseudo(user) {
    return this.database.query(`select * from ${this.table} where pseudo = ?`, [
      user.pseudo,
    ]);
  }

  insert(user) {
    return this.database.query(
      `insert into ${this.table} (pseudo, hashed_password) values (?, ?)`,
      [user.pseudo, user.hashed_password]
    );
  }

  update(user) {
    return this.database.query(
      `update ${this.table} set pseudo = ? where id = ?`,
      [user.pseudo, user.id]
    );
  }
}

module.exports = UserManager;
