//Require mysql and inquirer npm packages
var inquirer = require("inquirer");
var mysql = require("mysql");
var cTable = require("console.table")

//Variable to hold the table from the database
var inventory;

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
        inventory = res;
        console.log(inventory);
        promptUser();
    });
};

function promptUser() {
    inquirer.prompt([
        //Ask the user the ID of the item they would like to buy
        {
            type: "input",
            name: "idNumber",
            message: "What is the id number of the product you would like to buy?"
        },
        {
            type: "input",
            name: "quantity",
            message: "How many would you like to buy?"
        }
    ]).then(function(user) {
        console.log(user.quantity);
        var iOfInv = parseInt(user.idNumber) - 1;
        //Find out if the amount the user wants is available 
        if(user.quantity > inventory[iOfInv].stock_quantity) {
            console.log("You've had enough. You're cut off.")
        }
        else {
            console.log("We can do that")
        };
    });
};

//Call the function to show the user the merchandise
showTable();