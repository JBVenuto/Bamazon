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
        console.table(res);
    });
    promptUser();
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
    ])
}

//Call the function to show the user the merchandise
showTable();