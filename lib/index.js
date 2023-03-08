const fs = require("fs");
const clc = require("cli-color");
const bytes = require("bytes");

let fetchJSON, file;
let cnfg = {
  dbFile: null,
  autoBackup: false,
  backupLog: false,
  dbName: "Database",
};

class Database {
  /**
   *
   * [Example](https://github.com/vsl-dev/furfy.db#readmemd)
   * @param {string} databasePath Path of database file
   * @param {Object} config Database options (Database name and auto backup)
   *
   */
  constructor(databasePath, config) {
    if (databasePath && typeof databasePath != "string")
      throw new DatabaseError("You need set a database path!");

    databasePath = databasePath || "database.json";
    cnfg.dbFile = databasePath;

    if (!fs.existsSync(databasePath))
      return fs.writeFileSync(databasePath, "{}", "utf-8");

    fetchJSON = databasePath.endsWith(".json")
      ? databasePath
      : databasePath + ".json";
    file = JSON.parse(fs.readFileSync(fetchJSON, "utf-8"));
    /**
     * @property {string} databaseName Name for database just for fun
     */
    if (config && config.databaseName) {
      cnfg.dbName = config.databaseName;
    }
  }

  /**
   * @private
   */
  saveToFile() {
    fs.writeFileSync(fetchJSON, JSON.stringify(file, null, 1));
  }

  /**
   *
   * @param {string} key Key
   * @param {number} value Value
   * @example db.set("testData", "Data");
   *
   */
  set(key, value) {
    try {
      if (!key || !value) throw new DatabaseError("You should enter an input");
      file[key] = value;
      return this.saveToFile();
    } catch (err) {}
  }
  /**
   *
   * @param {string} key Key
   * @param {string} value Object or string
   */
  push(key, value) {
    try {
      if (!key || !value) throw new DatabaseError("You should enter an data");
      if (!file[key]) file[key] = [];
      file[key].push(value);
      return this.saveToFile();
    } catch (err) {}
  }
  /**
   *
   * @param {string} key Key
   * @param {number} value Value
   * @example db.add("testData", 1);
   *
   */
  add(key, value) {
    try {
      if (!key || !value) throw new DatabaseError("You should enter an data");
      if (typeof value !== "number")
        throw new DatabaseError("Please enter a number data");
      if (!file[key]) file[key] = 0;
      file[key] += value;
      return this.saveToFile();
    } catch (err) {}
  }
  /**
   *
   * @param {string} key Key
   * @example db.fetch("testData");
   *
   */
  fetch(key) {
    if (!key) throw new DatabaseError("You did not enter a data name");
    if (file && file[key]) return file[key];
  }
  /**
   *
   * @param {string} key Key
   * @example db.get("testData");
   *
   */
  get(key) {
    return this.fetch(key);
  }
  /**
   * Get all data in database
   */
  fetchAll() {
    return file;
  }
  /**
   *
   * @param {string} key
   * @returns true or false
   */
  has(key) {
    try {
      if (!key) throw new DatabaseError("You did not enter a data name");
      return file[key] ? true : false;
    } catch (err) {}
  }
  /**
   * Get size of database
   */
  size() {
    try {
      var json = JSON.stringify(this.fetchAll());
      var size = bytes(json.length);
      return size;
    } catch (err) {}
  }
  /**
   * Get the database information
   */
  info() {
    try {
      var info = {
        name: cnfg.dbName,
        path: cnfg.dbFile ?? "./database.json",
        size: this.size(),
      };
      return info;
    } catch (err) {}
  }
  /**
   * Clear all database
   */
  clear() {
    file = {};

    return this.saveToFile();
    console.log(
      clc.blue(`[${cnfg.dbName}]: `) + clc.green("Database cleared!")
    );
  }
}

/**
 * @private
 */
class DatabaseError extends Error {
  constructor(message) {
    super(message);
  }
}

module.exports = { Database };
