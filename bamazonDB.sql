/* Make sure there is no other database called bamazon*/
DROP DATABASE IF EXISTS bamazon_db;
/* Make a new database called bamazon */
CREATE DATABASE bamazon_db;

USE bamazon_db;

/* Make the table that will hold all of the data */
CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(127) NULL,
  department_name VARCHAR(127) NULL,
  price DECIMAL(10, 2) NULL,
  stock_quantity INT(11) DEFAULT 0,
  PRIMARY KEY (id)
);

/* Populate the table */
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("sunglasses", "clothing", 35.50, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("coffee mug", "home goods", 5, 27);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("jeans", "clothing", 78.99, 325);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("hat", "clothing", 24, 175);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("original Kandinsky", "home goods", 41600000, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("TV", "electronics", 3200.75, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cat's Cradle", "books", 24);