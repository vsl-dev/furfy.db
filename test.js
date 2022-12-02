const Database = require("./lib/index");
const db = new Database("");

db.on("ready", {
  message: "Connected to db",
});

db.add("testVarb", 1);
