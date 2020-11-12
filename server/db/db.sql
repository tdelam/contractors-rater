/* Create database */
CREATE DATABASE contractors_rater;

\connect contractors_rater

/* Contractors table */
CREATE TABLE contractors (
  id SERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  location VARCHAR(50) NOT NULL,
  price_range INT NOT NULL check(price_range >= 1 and price_range <= 5)
);

/* Reviews table */
CREATE TABLE reviews (
  id SERIAL NOT NULL PRIMARY KEY,
  contractor_id INT NOT NULL REFERENCES contractors(id),
  name VARCHAR(50) NOT NULL,
  content TEXT NOT NULL,
  rating INT NOT NULL check(rating >= 1 and rating <= 5)
);

/* Seed some data */
INSERT INTO contractors (name, location, price_range) VALUES ('ACME Inc', 'Toronto', 3);
INSERT INTO contractors (name, location, price_range) VALUES ('Chicken Inc', 'Toronto', 1);
INSERT INTO contractors (name, location, price_range) VALUES ('Hammers Inc', 'Toronto', 3);
INSERT INTO contractors (name, location, price_range) VALUES ('Builders Inc', 'Toronto', 2);
INSERT INTO contractors (name, location, price_range) VALUES ('Installers Inc', 'Toronto', 5);

INSERT INTO reviews (name, contractor_id, content, rating) VALUES ('Trevor', 1, 'Contractor was fast and was safe!', 5);
INSERT INTO reviews (name, contractor_id, content, rating) VALUES ('john', 1, 'Yah, just OK I guess, he could have did a better job!', 3);
INSERT INTO reviews (name, contractor_id, content, rating) VALUES ('Lesley', 2, 'Unsafe! Beware!', 1);
INSERT INTO reviews (name, contractor_id, content, rating) VALUES ('Dave', 1, 'Contractor was fast and was safe!', 5);
INSERT INTO reviews (name, contractor_id, content, rating) VALUES ('Alex', 1, 'Yah, just OK I guess, he could have did a better job!', 3);
INSERT INTO reviews (name, contractor_id, content, rating) VALUES ('Ryan', 2, 'Unsafe! Beware!', 1);
INSERT INTO reviews (name, contractor_id, content, rating) VALUES ('Alex', 3, 'Yah, just OK I guess, he could have did a better job!', 3);
INSERT INTO reviews (name, contractor_id, content, rating) VALUES ('Ryan', 4, 'Unsafe! Beware!', 1);
INSERT INTO reviews (name, contractor_id, content, rating) VALUES ('Alex', 5, 'Yah, just OK I guess, he could have did a better job!', 3);
INSERT INTO reviews (name, contractor_id, content, rating) VALUES ('Ryan', 2, 'Unsafe! Beware!', 1);
