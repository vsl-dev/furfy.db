# =========< FURFY DB >=========

## Basic JSON Database Module

### Changelogs: v1.1.0

- Added .getValues() and .getKeys() functions
- Fixed some bugs

### Installing

```shell
$ npm i furfy.db
```

### Setup

- Common JS

```js
const { Database } = require("furfy.db");
```

- ES Modules (ESM)

```js
import { Database } from "furfy.db";
```

```js
const db = new Database("./database.json", {
  name: "Database", // Database name
});
```

#

### Usage

```js
// Adding methods

db.set("test", { data: "test" }); // { "test": "test" }
db.push("pushTest", { data: "test" }); // { "pushTest": [ "test" ] }
db.add("counter", 1); // { "counter": 1 }

// Fetching methods

db.get("counter"); // { "counter": 1 }
db.fetch("test"); // { "test": "test" }
db.has("test"); // true or false
db.fetchAll(); // { "test": "test", "pushTest": [ "test" ], "counter": 1 }
db.getValues("testers"); // from { "testers": "tester1": true, "tester2": false } to [ { "tester1": true } , { "tester2": false } ]
db.getKeys("testers"); // [ "tester1", "tester2" ]

// Deleting methods

db.delete("test");

// Information methods

db.size(); // 47B
db.info(); // { "name": "Database", "path": "./databases/database.json", "size": "47B" }

// Others

db.clear(); // Clear all databases
```
