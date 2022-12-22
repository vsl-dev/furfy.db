# =========< VSL DB >=========
## Basic JSON Database Module

### Changelogs

Coming in new updates

### Installing

```shell
$ npm i vsldb
```

### Setup 

```js
const Database = require('vsldb')
const db = new Database('./database.json', {
    name: 'Database', // Database name
    autoBackup: true // Automatically backs up the database each time new data is added.
})
```
#

- Data adding methods
```js
db.set('user', {
    id: 1,
    name: 'Arthur'
}) // Set data on database

db.push('test', 'testing') // Push data to database
```

- Data fetching methods