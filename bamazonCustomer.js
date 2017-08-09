var mysql = require("mysql");
var inquirer = require("inquirer");

// Define Connection to MySQL
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Groundon121!",
  database: "bamazon"
});

// Connect
connection.connect(function(err) {
  if (err) throw err;
  main();
});

// Run Main Program
function main() {
    printItems();
}

function printItems() {
    var items = [];
    connection.query('SELECT * FROM products', function(err, result) {
        if (err)
            return console.log(err);
        for (var i=0; i<result.length; i++) {
            items.push("| Item: " + padSpaces(result[i].product_name, 30) + " | In Stock: " + padSpaces(JSON.stringify(result[i].stock_quantity), 3) + " | Price: $" + padSpaces(JSON.stringify(result[i].price), 5) + " |");
        }
        askItem(items);
    })
}

function padSpaces(str, num) {
    return str + new Array(num-str.length+1).join(' ');
}

function askItem(items) {
    // Ask What Item They Want to Buy
    inquirer.prompt({
        name: "item",
        type: "rawlist",
        message: "Choose an item to buy",
        choices: items,
        pageSize: 12
    }).then(function(answer) {
        // Check if there are items left
        if (parseInt(answer.item.substring(51, 54).trim()) > 0) {
            var itemName = answer.item.substring(8, 35).trim(); 
            askQuant(itemName);           
        } else {
            console.log("There are no more in stock. Please choose another item");
            printItems();
        }
    });
}

function askQuant(id) {
    inquirer.prompt({
        name: "quantity",
        type: "input",
        message: "How many would you like to buy?"
    }).then(function(quant) {
        // Check if we have enough items in stock
        connection.query("SELECT * FROM products WHERE ?", { product_name: id }, 
        function(err, result){
            var stock = result[0].stock_quantity;
            if (quant.quantity <= stock) {
                // Successful Order
                console.log("The total for " + quant.quantity + " [" + result[0].product_name + "] is $" + quant.quantity * result[0].price + ". The order has been placed successfully!");
                // Update Stock in DB
                var query = "UPDATE products SET stock_quantity = " + (stock - quant.quantity) + " WHERE product_name = '" + id + "'";
                console.log(query);
                connection.query(query,
                function(err){
                    if (err) throw err;
                });
                printItems();
            } else {
                // Insufficient Quanitity
                console.log("Insufficient quantity!")
                askQuant(id);
            }
        });
    });
}