/* Make sure there is no other database called bamazon*/
DROP DATABASE IF EXISTS bamazon;
/* Make a new database called bamazon */
CREATE DATABASE bamazon;

USE bamazon;

/* Make the table that will hold all of the data */
CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(127) NULL,
  department_name VARCHAR(127) NULL,
  price DECIMAL(10, 2) NULL,
  stock_quantity INT(11) DEFAULT 0,
  PRIMARY KEY (id)
);

