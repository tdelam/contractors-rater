/* Contractors table */
CREATE TABLE contractors (
  id SERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  location VARCHAR(50) NOT NULL,
  price_range INT NOT NULL check(price_range >= 1 and price_range <= 5)
);

/* Seed some data */
INSERT INTO contractors (name, location, price_range) VALUES ('ACME Inc', 'Toronto', 3);
INSERT INTO contractors (name, location, price_range) VALUES ('Chicken Inc', 'Toronto', 1);
INSERT INTO contractors (name, location, price_range) VALUES ('Hammers Inc', 'Toronto', 3);
INSERT INTO contractors (name, location, price_range) VALUES ('Builders Inc', 'Toronto', 2);
INSERT INTO contractors (name, location, price_range) VALUES ('Installers Inc', 'Toronto', 5);
