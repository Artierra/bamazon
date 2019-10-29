//first prompt user for a product id
//second prompt - how many they want to buy
//after customer checks order-check the store if there is enough
//if not log -insufficent quantity and prevent the order from going through
//if enough- fullfill customers order-update SQL database to show remaining quantity
//show customer total price of purchase
// require inquirer and sql code
//check connection
//make query to database

var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "127.0.0.1",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "rootroot",
    database: "bamazon_DB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    startSearch();
})

// var startSearch = function () {
//     //check connection
//     console.log('connection made');
//     // run the start function after the connection is made to prompt the user
//     startSearch();
// };
// function which prompts the user for what action they should take
function startSearch() {

    inquirer
        .prompt({
            name: "productID",
            type: "input",
            message: "What is the product you would like to submit?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        })

        .then(function (userinput) {
            console.log(userinput.productID);
        });

};