//Require mysql and inquirer npm packages
var inquirer = require("inquirer");
var mysql = require("mysql");

//Connect to the database
var connection = mysql.createConnection({
    host: "bamazon",
    user: "root",
    password: "root",
    database: "bamazon_db"
})