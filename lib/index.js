const fs = require("fs");
var clc = require("cli-color");
const DatabaseError = require("./Error.js");

let fetchJSON;
let file;
let dbFile;
let dbName = "Database";

class Database {
  /**
   *
   * [Example](https://github.com/vsl-dev)
   * @param {string} databasePath - Path of database file
   * @param {Object} config - Database options (Database name and auto backup)
   *
   */
  constructor(databasePath, config) {
    if (databasePath && typeof databasePath != "string")
      throw new DatabaseError(dbName, "You need set a database path!");

    databasePath = databasePath || "database.json";
    dbFile = databasePath;

    if (!fs.existsSync(databasePath))
      return fs.writeFileSync(databasePath, "{}", "utf-8");

    fetchJSON = databasePath.endsWith(".json")
      ? databasePath
      : databasePath + ".json";
    file = JSON.parse(fs.readFileSync(fetchJSON, "utf8"));
    /**
     * @property {string} databaseName - Name for database just for fun
     */
    if (config && config.databaseName) dbName = config.databaseName;
    /**
     * @property {string} autoBackup - Auto backup system. Works only when project restarts.
     */
    if (config && config.autoBackup) {
      fs.copyFile(
        databasePath,
        `backups/backup.${databasePath.replaceAll(/[^A-z0-9 _ -]/g, "")}`,
        (err) => {
          if (err) throw new DatabaseError(err);
        }
      );
    }
  }

  /**
   *
   * @param {string} key Key
   * @param {number} value Value
   * @example db.set("testData", "Data");
   *
   */
  set(key, value) {
    if (!key || !value)
      throw new DatabaseError(dbName, "You should enter an input");
    file[key] = value;
    fs.writeFileSync(fetchJSON, JSON.stringify(file, null, 1));
  }
  /**
   *
   * @param {string} key Key
   * @param {number} value Value
   * @example db.add("testData", 1);
   *
   */
  add(key, value) {
    if (!key || !value)
      throw new DatabaseError(dbName, "You should enter an data");
    if (typeof value !== "number")
      throw new DatabaseError(dbName, "Please enter a number data");
    if (!file[key]) file[key] = 0;
    file[key] += value;
    fs.writeFileSync(fetchJSON, JSON.stringify(file, null, 1));
  }
  /**
   *
   * @param {string} key Key
   * @example db.fetch("testData");
   *
   */
  fetch(key) {
    if (!key) throw new DatabaseError(dbName, "You did not enter a data name");
    if (file[key]) return file[key];
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
   * Get a backup of database
   */
  backup() {
    fs.copyFile(
      dbFile,
      `backups/backup.${dbFile.replaceAll(/[^A-z0-9 _ -]/g, "")}`,
      (err) => {
        if (err) throw new DatabaseError(err);
      }
    );
    console.log(
      clc.blue(`[${dbName}]: `) + clc.green("New database backup created!")
    );
  }
}

module.exports = Database;
