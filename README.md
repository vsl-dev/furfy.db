# =========< VSL DB >=========

## Basic JSON Database Module

### Changelogs

Coming in new updates

### Installing

```shell
$ npm i vsldb
```

### Setup

- Common JS

```js
const Database = require("vsldb");
```

- ES Modules (ESM)

```js
import { Database } from "vsldb/esm";
```

```js
const db = new Database("./database.json", {
  name: "Database", // Database name
  autoBackup: true, // Automatically backs up the database each time new data is added.
  backupLog: false, // Logs all backup activities
});
```

#

### Usage

```js
// Adding methods

db.set("test", { data: "test" });

db.push("pushTest", { data: "test" });

db.add("counter", 1);

// Fetching methods

db.get("user");
db.fetch("user");
db.has("user");
db.fetchAll();

// Deleting methods

db.delete("user");

// Information methods

db.size();
db.info();

// Others

db.clear();
db.backup();
```
