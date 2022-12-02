const Database = require("./lib/index");
const db = new Database("./databases/asda.json", {
  databaseName: "Stripe",
  autoBackup: false,
});

db.set("test", {
  id: 121321,
  username: "vsl-dev",
});
db.add("testVarb", 1);
console.log(db.get("test"), "GET");
console.log(db.fetch("test"), "FETCH");

db.backup();
