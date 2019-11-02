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
    console.log("connected as id " + connection.threadId);
    // run the start function after the connection is made to prompt the user
    ProductInfo();
})

function ProductInfo() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log(res);
        askforInput();;
    });
}
// The app should then prompt users with two messages.
//     * The first should ask them the ID of the product they would
// like to buy.* The second message should ask how many units of the
// product they would like to buy.

var askforInput = function () {
    inquirer
        .prompt([{
                name: "productID",
                type: "input",
                message: "What is the ID of the product you would like to buy?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "stockQuantity",
                type: "input",
                message: "How many lbs would like to buy?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])



        .then(function (userinput) {
            console.log(userinput.productID);
            console.log(userinput.stockQuantity);
        });
}