//Require mysql and inquirer npm packages
var inquirer = require("inquirer");
var mysql = require("mysql");
var cTable = require("console.table")

//Connect to the database
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "bamazon_db"
})

//Function that shows the user the available merchandise
function showTable() {
    connection.query("SELECT * FROM products", function(err, res) {
        if(err) throw err;
        // console.log(res);
        console.table(res);
        promptUser();
    });
};

//Promt the manager to find out what they would like to do
function promptUser() {
    inquirer.prompt([
        {
            name: "action",
            type: "list",
            message: "Which of the following actions would you like to perform?",
            choices: ["View products for sale", "View low inventory", "Add to inventory", "Add new product"]
        }
    ]).then(function(answer) {
        //Switch based on the manager's choice
        switch (answer.action) {
            //Run function to view all the products
            case "View products for sale":
                viewProducts();
                break;

            //Run function to view low inventory
            case "View low inventory":
                lowInv();
                break;

            //Run function to add inventory
            case "Add to inventory":
                addInv();
                break

            //Run function to add a new product
            case "Add new product":
                addProduct();
                break
        }
    })
}