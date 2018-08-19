//Require mysql and inquirer npm packages
var inquirer = require("inquirer");
var mysql = require("mysql");
var cTable = require("console.table")

//Variable to hold the table from the database

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
        connection.query("SELECT * FROM products", function(err, res) {

            console.log(user.quantity);

            //Variables from the user input and database
            var iOfInv = parseInt(user.idNumber) - 1;
            var totalAvailable = res[iOfInv].stock_quantity;
            var newQuantity = totalAvailable - user.quantity;

            console.log("old quant: " + totalAvailable + "new quant: " + newQuantity);

            //Find out if the amount the user wants is available 
            // if(user.quantity > res[iOfInv].stock_quantity) {
            
            if (user.quantity <= totalAvailable){
                //If the amount ordered is available subract that amount from the database
                console.log("We can do that");
                connection.query('UPDATE products SET stock_quantity = ?, WHERE id = ?', [newQuantity, iOfInv], function (error, quant) {
                if(error) throw error;
                    console.log("New quantity: " + quant);
                });
            }
            else {
                console.log("Sorry, we don't have that many in stock.");
            };
        })
    });
};

//Call the function to show the user the merchandise
showTable();