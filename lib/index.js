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
   * [Example](https://github.com/vsl-dev)
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
    /**
     * @property {boolean} backupLog Auto log system for backups
     */
    if (config && config.backupLog) {
      cnfg.backupLog = config.backupLog;
    }
    /**
     * @property {string} autoBackup Auto backup system. Works only when project restarts.
     */
    if (config && config.autoBackup) {
      cnfg.autoBackup = true;
      this.backupToFile();
    }
  }

  /**
   * @private
   */
  saveToFile() {
    fs.writeFileSync(fetchJSON, JSON.stringify(file, null, 1));
  }
  /**
   * @private
   */
  async backupToFile() {
    var fetchFile = await fs.existsSync(
      `backups/backup.${
        cnfg.dbFile
          .replaceAll(/[^A-z0-9 _ -]/g, " ")
          .split(" ")
          .reverse()[1]
      }.json`
    );

    if (fetchFile) {
      cnfg.backupLog
        ? console.log(
            clc.blue(`[${cnfg.dbName}]: `) +
              "New database backup created - " +
              Date.now()
          )
        : null;
      fs.writeFileSync(
        `backups/backup.${
          cnfg.dbFile
            .replaceAll(/[^A-z0-9 _ -]/g, " ")
            .split(" ")
            .reverse()[1]
        }.json`,
        JSON.stringify(file, null, 1)
      );
    } else {
      cnfg.backupLog
        ? console.log(
            clc.blue(`[${cnfg.dbName}]: `) +
              "New database backup created - " +
              Date.now()
          )
        : null;
      fs.copyFile(
        cnfg.dbFile,
        `backups/backup.${
          cnfg.dbFile
            .replaceAll(/[^A-z0-9 _ -]/g, " ")
            .split(" ")
            .reverse()[1]
        }.json`,
        (err) => {
          if (err) throw new DatabaseError("Error: ", err);
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
    if (!key || !value) throw new DatabaseError("You should enter an input");
    file[key] = value;
    cnfg.autoBackup ? this.backupToFile() : null;
    return this.saveToFile();
  }
  /**
   *
   * @param {string} key Key
   * @param {string} value Object or string
   */
  push(key, value) {
    if (!key || !value) throw new DatabaseError("You should enter an data");
    if (!file[key]) file[key] = [];
    file[key].push(value);
    cnfg.autoBackup ? this.backupToFile() : null;
    return this.saveToFile();
  }
  /**
   *
   * @param {string} key Key
   * @param {number} value Value
   * @example db.add("testData", 1);
   *
   */
  add(key, value) {
    if (!key || !value) throw new DatabaseError("You should enter an data");
    if (typeof value !== "number")
      throw new DatabaseError("Please enter a number data");
    if (!file[key]) file[key] = 0;
    file[key] += value;
    cnfg.autoBackup ? this.backupToFile() : null;
    return this.saveToFile();
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
    if (!key) throw new DatabaseError("You did not enter a data name");
    return file[key] ? true : false;
  }
  /**
   * Get size of database
   */
  size() {
    var json = JSON.stringify(this.fetchAll());
    var size = bytes(json.length);
    return size;
  }
  /**
   * Get the database information
   */
  info() {
    var info = {
      name: cnfg.dbName,
      path: cnfg.dbFile ?? "./databases/database.json",
      autoBackup: cnfg.autoBackup ? true : false,
      size: this.size(),
    };
    return info;
  }
  /**
   * Clear all database
   */
  clear() {
    file = {};
    cnfg.autoBackup ? this.backupToFile() : null;
    return this.saveToFile();
    console.log(
      clc.blue(`[${cnfg.dbName}]: `) + clc.green("Database cleared!")
    );
  }
  /**
   * Get a backup of database
   */
  backup() {
    return this.backupToFile();
  }
}

/**
 * @private
 */
class DatabaseError extends Error {
  constructor(message) {
    super(clc.blue(`[${cnfg.dbName}]: `) + clc.red(message));
  }
}

module.exports = Database;
