# Simple Node app

A simple NodeJS app to deploy to app server in Puppet-vagrant task

Please pardon the poor code, this was done hastily while the author was watching
Game of Thrones.

## Requirement

Since the package works in Nodejs and use mysql backend, you will need

* nodejs
* npm

And these 2 npm packages

* simplehttpdispatcher
* mysql

## Database

You should set up a remote database server (task of puppet work) and create
a new user in it, which allows the app to connect 

Createa new database and grant that user these privileges (at least) 

* ```select```
* ```insert```

The database should contains one table, the SQL to create this table is
```sql
CREATE TABLE votes (
    id INT NOT NULL AUTO_INCREMENT,
    date_added DATETIME,
    vote_value INT,
    PRIMARY KEY (id));
```

The application (```index.js```) should be configured with the correct server IP
address, username and password as well as the database.


## Testing

You can run the application by

```bash
node index.js
```

The output should be 

```bash
→ node index.js
Server listening on: http://localhost:8080
connected as id 17
```

You can then access the 2 API end point

* ```/sumlast10``` - returns the sum of last 10 votes
* ```/submit_vote``` - submit a vote via POST request (with a field name ```value``` containing the value of your vote)

![Sample result](/node_app/Screen Shot 2016-06-14 at 9.53.04 AM.png?raw=true)
