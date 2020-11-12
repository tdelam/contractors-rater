# Datatabase set up

Create a `.env` file in the `server` directory and fill it with the following:

```
PORT=4000
PGUSER=<YOURUSER>
PGPASSWORD=<PASS>
PGHOST=localhost
PGDATABASE=contractors_rater
PGPORT=5432
```

Connect to your Postgresql database and issue the following commands (this could and should be a script/migration):

1. `CREATE DATABASE contractors_rater;`
2. `\connect contractors_rater;`
3. ```
   CREATE TABLE contractors (
     id SERIAL NOT NULL PRIMARY KEY,
     name VARCHAR(50) NOT NULL,
     location VARCHAR(50) NOT NULL,
     price_range INT NOT NULL check(price_range >= 1 and price_range <= 5)
   );
   ```
4. ```
   CREATE TABLE reviews (
     id SERIAL NOT NULL PRIMARY KEY,
     contractor_id INT NOT NULL REFERENCES contractors(id),
     name VARCHAR(50) NOT NULL,
     content TEXT NOT NULL,
     rating INT NOT NULL check(rating >= 1 and rating <= 5)
   );
   ```
5. ```
   INSERT INTO contractors (name, location, price_range) VALUES ('ACME Inc', 'Toronto', 3);
   INSERT INTO contractors (name, location, price_range) VALUES ('Chicken', 'Ottawa', 1);
   INSERT INTO contractors (name, location, price_range) VALUES ('Hammers Inc', 'Chicago', 3);
   INSERT INTO contractors (name, location, price_range) VALUES ('Builders Inc', 'Minnesota', 2);
   INSERT INTO contractors (name, location, price_range) VALUES ('Installers Inc', 'Sudbury', 5);
   ```
6. `\q` to exit the shell

```

# Code/Server Scripts

## Node Server Install and Run

In the project root directory, run:

```

$  cd server
$ yarn install
\$ yarn start

```

Nodemon is a dep so any changes to the backend code will refresh without restarting the server.


## ReactJS Install and Run
In the project root directory, run:

```

$  cd client
$ yarn install
\$ yarn start

```
Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
```

Once you're logged in, go ahead and add contractors/sub-contractors. You can also add ratings, update, and delete entries.
