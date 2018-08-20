//Require mysql and inquirer npm packages
var inquirer = require("inquirer");
var mysql = require("mysql");
var cTable = require("console.table")

//Variables to hold temporary data from the database and input
var iOfInv;
var totalAvailable;
var newQuantity;
var totalPrice;

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
            iOfInv = parseInt(user.idNumber) - 1;
            totalAvailable = res[iOfInv].stock_quantity;
            totalPrice = res[iOfInv].price * user.quantity;
            newQuantity = totalAvailable - user.quantity;

        // });

        //Find out if the amount the user wants is available 
        // if(user.quantity > res[iOfInv].stock_quantity) {
            
        if (user.quantity > totalAvailable){
            console.log("Sorry, we don't have that many in stock.")
            showTable();
        }
        else {
            //If the amount ordered is available subract that amount from the database
            console.log("We can do that");
            connection.query('UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?', [(user.quantity), user.idNumber], function (error) {
                if(error) throw error;
                console.log("Your total comes to $" + totalPrice);
                showTable();
            });
        };
    });
    })
};


//Call the function to show the user the merchandise
showTable();