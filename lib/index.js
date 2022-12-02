const fs = require("fs");
var clc = require("cli-color");
const DatabaseError = require("./error.js");

if (!fs.existsSync("./database.json"))
  return fs.writeFileSync("database.json", {}, function (err) {
    if (err) throw err;
  });

let fetchJSON;
let file;
let dbName = "Database";
class Database {
  constructor(databasePath, config) {
    if (databasePath && typeof databasePath != "string")
      throw new TypeError(
        clc.blue("[Database]: ") + clc.red("You need set a database path!")
      );
    databasePath = databasePath ? databasePath : "./database.json";
    fetchJSON = databasePath.endsWith(".json")
      ? databasePath
      : databasePath + ".json";
    file = JSON.parse(fs.readFileSync(fetchJSON, "utf8"));
    if (config && config.databaseName) dbName = config.databaseName;
  }

  on(param, config) {
    if (param === "ready") {
      if (config.message)
        return console.log(
          clc.blue(`[${dbName}]: `) + clc.green(config.message)
        );
    } else {
      throw new DatabaseError(dbName, "Undefined parameter -> " + param);
    }
  }

  /**
   *
   * @param {string} key Key
   * @param {number} value Value
   * @example db.add("testData", 1);
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
  fetch(key) {
    if (!key) throw new DatabaseError(dbName, "You did not enter a data name");
    if (file[key]) return file[key];
  }
  get(key) {
    this.fetch(key);
  }
}

module.exports = Database;
