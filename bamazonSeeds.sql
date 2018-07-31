CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(50) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("dogs playing poker", "art", 99.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("beer", "things that are great", 7.00, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("t-shirts", "things you wear", 20.00, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("converse", "things you wear", 50.00, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("car", "things you drive", 1000.00, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("bike", "things you ride", 800.00, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("dog", "things that are great", 200.00, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("cat", "things that are great", 42.00, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("cocktail", "potions", 10.00, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("pizza", "things that are great", 14.00, 10);

