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
        console.log('----------------------------------------------------------------------------------------------------')

        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + " | " + "Product: " + res[i].product_name + " | " + "Stock Quantity: " + res[i].stock_quantity + " | " + "Price: " + res[i].price + " | ");
            console.log('--------------------------------------------------------------------------------------------------')
        }
        askforInput();;
    });
}
// The app should then prompt users with two messages.
//     * The first should ask them the ID of the product they would
// like to buy.* The second message should ask how many units of the
// product they would like to buy.

var askforInput = function () {
    inquirer
        .prompt({
            name: "productID",
            type: "input",
            message: "What is the ID of the product you would like to buy?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        })
        .then(function (userInput1) {
            var selection = userInput1.productID;
            connection.query("SELECT * FROM products WHERE item_id = ?", selection, function (err, res) {
                if (err) {
                    throw err;
                    console.log(res);
                } else if (res.length === 0) {
                    console.log("That product does not exist, please enter a product id from the list above");
                    askforInput();

                } else {
                    inquirer
                        .prompt({
                            name: "purchase",
                            type: "input",
                            message: "How many lbs would like to buy?",
                            validate: function (value) {
                                if (isNaN(value) === false) {
                                    return true;
                                } else {
                                    return false;
                                }
                            }
                        })
                        .then(function (userInput2) {
                            var purchase = userInput2.purchase;
                            var newStockQuantity = res[0].stock_quantity - purchase;

                            if (purchase > res[0].stock_quantity) {
                                console.log("Sorry we only have " + res[0].stock_quantity + " lbs left");
                                askforInput();
                            } else {
                                console.log("-------------------------------------");
                                console.log(purchase + " lbs of " + res[0].product_name + " at $" + res[0].price +
                                    " for a total of $" + purchase * res[0].price);
                                console.log("There are only " + newStockQuantity + " lbs left");


                                connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ? ",
                                    [newStockQuantity,
                                        res[0].item_id
                                    ],
                                    function (err, res) {
                                        if (err) throw err;
                                        console.log("Thank you for your purchase");
                                        console.log("Your order has been processed");
                                        connection.end();
                                    }

                                );
                            }
                        });
                };

            });
        });
}
// TypeError: this._callback.apply is not a function
//     at Query.Sequence.end(/Users/monicabongue / Desktop / BC / assignments / bamazon / node_modules / mysql / lib / protocol / sequences / Sequence.js: 83: 24)
// at Query.ErrorPacket(/Users/monicabongue / Desktop / BC / assignments / bamazon / node_modules / mysql / lib / protocol / sequences / Query.js: 90: 8)
// at Protocol._parsePacket(/Users/monicabongue / Desktop / BC / assignments / bamazon / node_modules / mysql / lib / protocol / Protocol.js: 291: 23)
// at Parser._parsePacket(/Users/monicabongue / Desktop / BC / assignments / bamazon / node_modules / mysql / lib / protocol / Parser.js: 433: 10)
// at Parser.write(/Users/monicabongue / Desktop / BC / assignments / bamazon / node_modules / mysql / lib / protocol / Parser.js: 43: 10)
// at Protocol.write(/Users/monicabongue / Desktop / BC / assignments / bamazon / node_modules / mysql / lib / protocol / Protocol.js: 38: 16)
// at Socket.<anonymous>(/Users/monicabongue / Desktop / BC / assignments / bamazon / node_modules / mysql / lib / Connection.js: 91: 28)
// at Socket.<anonymous>(/Users/monicabongue / Desktop / BC / assignments / bamazon / node_modules / mysql / lib / Connection.js: 525: 10)
// at Socket.emit(events.js: 198: 13)
// at addChunk(_stream_readable.js: 288: 12)
// Monicas - MacBook - Pro: bamazon monicabongue$ 