var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) {
        throw err;
    } else {
        console.log("connected as id " + connection.threadId + "\n");
    }
    displayItem()
});

function displayItem() {
    connection.query("SELECT item_id, product_name, price FROM products", function(err, products) {
        if (err) {
            throw err;
        } else {
            console.log(products);
            console.log('\n');

            inquirer.prompt([
                {
                    type: "input",
                    name: "item_id",
                    message: "Please enter the item_id of the product you would like to buy."
                },
                {
                    type: "input",
                    name: "quantity",
                    message: "Please enter the quantity of the product you would like to buy."
                }
            ]).then(function(data) {
                connection.query("SELECT * FROM products WHERE item_id = " + data.item_id, function(err, products) {
                    if (err) {
                        throw err;
                    }else {
                        // console.log(products);
                        var quan = products[0].stock_quantity;
                        var sales = products[0].product_sales;
                        var newQuan = parseFloat(quan) - parseFloat(data.quantity);
                            // console.log(newQuan);
                        var total = (products[0].price * parseFloat(data.quantity)).toFixed(2);

                        if (quan < data.quantity){
                            console.log("\nInsufficient quantity!\n");

                        }else if (data.quantity < 0) {
                            console.log("\nCan't read '" + data.quantity + "' quantity.\n");
                        
                        }else {
                            sales += parseFloat(total);
                         
                            connection.query(
                                "UPDATE products SET ? WHERE item_id = " + data.item_id, {
                                    stock_quantity: newQuan,
                                    product_sales: sales
                                },
                                function(err, res) {
                                    console.log("\n" + res.affectedRows + " product quantity updated!\n");
                            });
                            console.log("\nYour Total is: $" + total + ".\n");
                        }
                        connection.end();
                    }
                });
            });
        }
    });
}