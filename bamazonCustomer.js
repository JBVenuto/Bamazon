//Require mysql and inquirer npm packages
var inquirer = require("inquirer");
var mysql = require("mysql");

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
        console.log(res);
    });
};

//Call the function to show the user the merchandise
showTable();