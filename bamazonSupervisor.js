var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');

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
            console.log('\n = = = Supervisor View = = = \n');

            inquirer.prompt([
                {
                    type: "list",
                    message: "Menu Options:",
                    choices: [
                    "View Product Sales by Department", 
                    "Create New Department"],
                    name: "menu"
                }
            ]).then(function(data) {

                if (data.menu == "View Product Sales by Department") {
                    connection.query("SELECT department_id, departments.department_name AS department_name, over_head_costs, SUM(product_sales) AS product_sales, (SUM(product_sales) - over_head_costs) AS total_profit FROM departments LEFT JOIN products ON departments.department_id = products.p_department_id GROUP BY departments.department_id", function(err, departments) {
                        if (err) {
                            throw err;
                        }else {
                            console.table(departments);
                        }
                        connection.end();
                    })
                } else if (data.menu == "Create New Department") {
                    connection.query("SELECT * FROM departments", function(err, departments) {
                        if (err) {
                            throw err;
                        }else {
                            // console.log (departments);

                            inquirer.prompt([
                                {
                                    type: "input",
                                    name: "department_name",
                                    message: "Please enter the department name:"
                                },
                                {
                                    type: "input",
                                    name: "over_head_costs",
                                    message: "over head costs:"
                                }
                            ]).then(function(data) {
                                    if (err) {
                                        throw err;
                                    }else {
                                        connection.query(
                                            "INSERT departments SET ?", {
                                                department_name: data.department_name,
                                                over_head_costs: data.over_head_costs
                                            },
                                            function(err, res) {
                                                console.log(res.affectedRows + " new department added!\n");
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