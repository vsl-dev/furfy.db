const Database = require("./lib/index");
const db = new Database("./databases/asda.json", {
  databaseName: "Stripe",
  autoBackup: true,
});

db.set("test", {
  id: 121321,
  username: "vsl-dev",
});
db.push('testPush', 'aaa')
db.add("testVarb", 1);
console.log(db.get("test"), "GET");
console.log(db.fetch("test"), "FETCH");
console.log(db.has('testVarb'))

// db.backup();
// db.clear()