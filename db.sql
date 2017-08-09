DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price INT default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES
('iPhone 8', 'Electronics', 1100, 10),
('Hiking Boots', 'Sports and Outdoors', 110, 20),
('Halflife 3', 'Entertainment', 60, 1),
('Game of Thrones Season 8', 'Entertainment', 150, 5),
('Lamp', 'Home and Kitchen', 20, 12),
('Sweatshirt', 'Clothing', 45, 20),
('Baseball Bat', 'Sports and Outdoors', 20, 12),
('Book Bundle: A Series of Unfortunate Events', 'Books', 20, 12),
('Plumbus', 'Home and Kitchen', 20, 12),
('Whoopee Cushion', 'Entertainment', 20, 12);

SELECT * FROM products;