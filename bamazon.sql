DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(255) NOT NULL,
  over_head_costs DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs)
VALUES 
    ("Electronics", 10000), 
    ("Home & Kitchen", 5000), 
    ("Sports & Outdoors", 2000), 
    ("Video Games", 10000),
    ("Books", 5000);


CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(255) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  p_department_id INT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT NOT NULL,
  product_sales DECIMAL(10,2) NULL,
  PRIMARY KEY (item_id),
  FOREIGN KEY (p_department_id) REFERENCES departments(department_id)
);

INSERT INTO products (product_name, department_name, p_department_id, price, stock_quantity)
VALUES 
    ("Kindle E-Reader", "Electronics", 1, 119.99, 50), 
    ("ASUS VivoBook S Thin & Light Laptop", "Electronics", 1, 799.00, 10), 
    ("Dell Inspiron 13 5000 2-in-1 ", "Electronics", 1, 1079.99, 5), 
    ("Nespresso VertuoPlus Coffee and Espresso Maker", "Home & Kitchen", 2, 132.00, 25), 
    ("Nostalgia Electrics 3-In-1 Breakfast Station", "Home & Kitchen", 2, 75.99, 10), 
    ("KitchenAid KSM150PSER Stand Mixer", "Home & Kitchen", 2, 254.55, 45), 
    ("NetAngler Fishing Lures Kit Bass Baits", "Sports & Outdoors", 3, 19.99, 18), 
    ("Berrypro 3-Piece Spinning Rod", "Sports & Outdoors", 3, 57.99, 5), 
    ("Pokemon: Let's Go, Pikachu! (Nintendo Switch)", "Video Games", 4, 59.99, 500), 
    ("Super Mario Party! (Nintendo Switch)", "Video Games", 4, 59.99, 50),
    ("LG 32MA70HY-P 32-Inch Full HD IPS Monitor", "Electronics", 1, 199.99, 5),
    ("Callaway Men's Strata Tour Complete Golf Set (18-Piece)", "Sports & Outdoors", 3, 474.86, 16),
    ("Algorithms by Robert Sedgewick", "Books", 5, 80.00, 22);


