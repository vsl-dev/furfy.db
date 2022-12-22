const Database = require("./lib/index");
const db = new Database("./databases/sada.json", {
  databaseName: "Stripe",
  autoBackup: true
});

console.log(db.fetch("s"), "GET / FETCH");
console.log(db.has("a"), "HAS");

db.set("s", "sa");
db.set("data", {
  user: 1,
  usr: 312,
});

db.push("n", "aaaa");


// db.clear()

db.add("a", 1);

setInterval(() => {
  db.backup();
  db.add("counter", 1);
}, 1500);


console.log(db.info())