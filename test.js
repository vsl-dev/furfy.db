const { Database } = require("./lib/index");
const db = new Database("./database.json", {
  databaseName: "Database",
});

// Adding methods

db.set("test", { data: "test" }); // { "test": "test" }

db.push("pushTest", { data: "test" }); // { "pushTest": [ "test" ] }

db.add("counter", 1); // { "counter": 1 }

// Fetching methods

console.log(db.get("counter")); // { "counter": 1 }
console.log(db.fetch("test")); // { "test": "test" }
console.log(db.has("test")); // true or false
console.log(db.fetchAll()); // { "test": "test", "pushTest": [ "test" ], "counter": 1 }

// Information methods

console.log(db.size()); // 47B
console.log(db.info()); // { "name": "Database", "path": "./databases/database.json", "size": "47B" }