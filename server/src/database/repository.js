const { pool } = require("./db");
const APIResult = require("../utils/APIResult");

class Repository {
  constructor(tableName) {
    this.tableName = tableName;
  }

  /**
   * Inserts a new item into the DB. The keys are the columns, the values are the data inserted.
   * Does NOT support JSON items.
   *
   * @param {Object} params
   * @returns {Promise<APIResult>}
   */
  async create(params) {
    try {
      const client = await pool.connect();
      const keys = Object.keys(params).join(", ");
      const values = Object.values(params);
      const placeholders = values.map((_, i) => `$${i + 1}`).join(", ");
      const result = await client.query(
        `INSERT INTO ${this.tableName} (${keys}) VALUES (${placeholders}) RETURNING *`,
        values
      );
      client.release();
      return new APIResult(201, result.rows[0]);
    } catch (error) {
      return this._parseError(error);
    }
  }

  /**
   * Returns all the elements in the table.
   *
   * @param {int?} limit Max number of results. If none specified, no limit
   * @param {int?} offset Only retrieves numbers after the offset. Offset of 40 returns item 41+. Must be using in conjunction with limit.
   * @returns {Promise<APIResult>}
   */
  async read(limit = null, offset = null) {
    try {
      let searchString = `SELECT * FROM ${this.tableName}`;
      let dbParams = [];
      if (limit) {
        searchString += " LIMIT $1";
        dbParams.push(limit);
      }

      if (offset) {
        searchString += " OFFSET $2";
        dbParams.push(offset);
      }

      const client = await pool.connect();
      const result = await client.query(searchString, dbParams);
      client.release();
      return new APIResult(200, result.rows);
    } catch (error) {
      return this._parseError(error);
    }
  }

  async update(id, column, value) {
    try {
      const updateStatement = `UPDATE ${this.tableName} SET ${column} = $1 WHERE id = $2`;
      const client = await pool.connect();
      await client.query(updateStatement, [value, id]);
      client.release();
      return new APIResult(200, "Updated columns");
    } catch (error) {
      return this._parseError(error);
    }
  }

  /**
   * This allows for custom SQL statements to be run on this table.
   *
   * @param {string} selectStatement This is what is selected, it should be the desired columns or * if all desired
   * @param {string} whereStatement This is the full where statment. Should have placeholders such as $1 and $2 for values that are passed in the values param
   * @param {Array<any>} values These are the values inserted into the statment. This is for DB sanitization. The placeholders reference the index (placeholder-1), so $1 references index 0
   * @returns {Promise<APIResult>}
   */
  async readByCustom(selectStatement, whereStatement, values) {
    try {
      let searchString = `SELECT ${selectStatement} FROM ${this.tableName} WHERE ${whereStatement}`;
      const client = await pool.connect();
      const result = await client.query(searchString, values);
      return new APIResult(200, result.rows);
    } catch (error) {
      return this._parseError(error);
    }
  }

  _parseError(error) {
    // type error
    if (error.code === "22P02") return new APIResult(400, error.toString());
    // should not be null but it is
    if (error.code === "23502") return new APIResult(400, error.toString());
    // foreign key error
    if (error.code === "23503") return new APIResult(400, error.detail);
    // unique value conflict
    if (error.code === "23505") return new APIResult(409, error.detail);
    // column does not exist in table
    if (error.code === "42703") return new APIResult(400, error.toString());
    // any other error
    console.error(error);
    return new APIResult(500, "Internal Server Error", error);
  }
}

module.exports = Repository;
