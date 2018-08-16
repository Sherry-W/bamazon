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
    menuOption()
});

function menuOption() {
    connection.query("SELECT * FROM products", function(err, products) {
        if (err) {
            throw err;
        } else {
            // console.log(products);
            console.log('\n = = = Manager View = = = \n');

            inquirer.prompt([
                {
                    type: "list",
                    message: "Menu Options:",
                    choices: [
                    "View Products for Sale", 
                    "View Low Inventory", 
                    "Add to Inventory", 
                    "Add New Product"],
                    name: "menu"
                }
            ]).then(function(data) {

                if (data.menu == "View Products for Sale") {
                    connection.query("SELECT * FROM products", function(err, products) {
                        if (err) {
                            throw err;
                        }else {
                            console.log (products);
                        }
                        connection.end();
                    })
                } else if (data.menu == "View Low Inventory") {
                    connection.query("SELECT * FROM products WHERE stock_quantity <= 5", function(err, products) {
                        if (err) {
                            throw err;
                        }else {
                            console.log (products);
                        }
                        connection.end();
                    })
                } else if (data.menu == "Add to Inventory") {
                    connection.query("SELECT * FROM products", function(err, products) {
                        if (err) {
                            throw err;
                        }else {
                            console.log (products);

                            inquirer.prompt([
                                {
                                    type: "input",
                                    name: "item_id",
                                    message: "Please enter the item_id of the product you would like to update."
                                },
                                {
                                    type: "input",
                                    name: "quantity",
                                    message: "Please enter the quantity you are adding:"
                                }
                            ]).then(function(data) {
                                connection.query("SELECT * FROM products WHERE item_id = " + data.item_id, function(err, products) {
                                    if (err) {
                                        throw err;
                                    }else {
                                        var quan = products[0].stock_quantity;
                                        var newQuan = parseFloat(quan) + parseFloat(data.quantity);
                                        // console.log (newQuan, quan, data.quantity) 
                                        connection.query(
                                            "UPDATE products SET ? WHERE item_id = " + data.item_id, {
                                                stock_quantity: newQuan
                                            },
                                            function(err, res) {
                                                console.log("\n" + res.affectedRows + " product quantity updated!\n");
                                        });
                                    }
                                    connection.end();
                                })
                            });
                        }
                    });
                    
                } else if (data.menu == "Add New Product") {
                    connection.query("SELECT department_name FROM departments", function(err, departments) {
                        if (err) {
                            throw err;
                        }else {
                            var depart_names = []
                            // console.log (departments[0].department_name);
                            for (var i = 0; i < departments.length; i++) {
                                var depart_name = departments[i].department_name;
                                depart_names.push(depart_name);
                            }
                            inquirer.prompt([
                                {
                                    type: "input",
                                    name: "product_name",
                                    message: "Please enter the name of the product you are adding:"
                                },
                                {
                                    type: "list",
                                    name: "department_name",
                                    message: "Department:",
                                    choices: depart_names
                                },
                                {
                                    type: "input",
                                    name: "price",
                                    message: "Price:"
                                },
                                {
                                    type: "input",
                                    name: "quantity",
                                    message: "Quantity:"
                                }
                            
                            ]).then(function(data) {
                                    if (err) {
                                        throw err;
                                    }else {
                                        var departID = parseInt(depart_names.indexOf(data.department_name)) + 1;
                                        // console.log (departID);
                                        connection.query(
                                            "INSERT products SET ?", {
                                                product_name: data.product_name,
                                                department_name: data.department_name,
                                                p_department_id: departID,
                                                price: data.price,
                                                stock_quantity: data.quantity
                                            },
                                            function(err, res) {
                                                console.log("\n" + res.affectedRows + " new product added!\n");
                                        });
                                    }
                                    connection.end();
                            });
                        }
                    })
                }  
            });
        }
    });
}
