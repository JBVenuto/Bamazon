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
                showTable();
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

promptUser();

//Function that shows the manager the available merchandise
function showTable() {
    connection.query("SELECT * FROM products", function(err, res) {
        if(err) throw err;
        // console.log(res);
        console.table(res);
        promptUser();
    });
};

//Function that shows the manager products that have less that 25 units in stock
function lowInv() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 25", function(err, res) {
        if(err) throw err;
        console.table(res);
        promptUser();
    });
};

//Function that allows the manager to add to the inventory for an item
function addInv() {
    inquirer.prompt([
        //Ask the user the ID of the item they want to increase the inventory for
        {
            type: "input",
            name: "idNumber",
            message: "What is the id number of the product for which you would like to increase the inventory?"
        },
        {
            type: "input",
            name: "quantity",
            message: "How many units would you like to add to the inventory?"
        }
    ]).then(function(user) {
        
    };
};

//Function that allows the manager to add a product
function addProduct() {

};