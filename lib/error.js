var clc = require("cli-color");

class DatabaseError extends Error {
  constructor(name, message) {
    super(clc.blue(`[${name}]: `) + clc.red(message));
  }
}

module.exports = DatabaseError