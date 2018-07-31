var inquirer = require("inquirer")
var mysql = require("mysql")
var cTable = require("console.table")

// var itemList = ["fljkd", "dl;fkajl;"]

var itemList = []

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazonDB"
});



// number validation
function validateInput(value) {
	var integer = Number.isInteger(parseFloat(value));
	var sign = Math.sign(value);

	if (integer && (sign === 1)) {
		return true;
	} else {
		return "Please enter a whole non-zero number.";
	}
}


function promptUserPurchase() {

	inquirer.prompt([
		{
			type: "input",
			name: "item_id",
			message: "Please enter the Item ID which you would like to purchase.",
			validate: validateInput,
			filter: Number
		},
		{
			type: "input",
			name: "quantity",
			message: "How many do you need?",
			validate: validateInput,
			filter: Number
        }
	]).then(function(input) {
		console.log("Customer has selected: \n    item_id = "  + input.item_id + "\n    quantity = " + input.quantity);

		var item = input.item_id;
        var quantity = input.quantity;
        
		var queryStr = "SELECT * FROM products WHERE ?";

		connection.query(queryStr, {item_id: item}, function(err, data) {
			if (err) throw err;

			if (data.length === 0) {
				console.log("ERROR: Invalid Item ID. Please select a valid Item ID.");
				displayInventory();

			} else {
				var productData = data[0];

				if (quantity <= productData.stock_quantity) {
					console.log("Congratulations, the product you requested is in stock! Placing order!");

					var updateQueryStr = "UPDATE products SET stock_quantity = " + (productData.stock_quantity - quantity) + " WHERE item_id = " + item;

					connection.query(updateQueryStr, function(err, data) {
						if (err) throw err;

						console.log("Your oder has been placed! Your total is $" + productData.price * quantity);
						console.log("Thank you for shopping with us!");
						console.log("\n---------------------------------------------------------------------\n");

						connection.end();
					})
				} else {
					console.log("Sorry, there is not enough product in stock, your order can not be placed as is.");
					console.log("Please modify your order.");
					console.log("\n---------------------------------------------------------------------\n");

					displayInventory();
				}
			}
		})
	})
}

function displayInventory() {

	queryStr = "SELECT * FROM products";

	// query
	connection.query(queryStr, function(err, data) {
		if (err) throw err;

		console.log("Existing Inventory: ");
		console.log("...................\n"); 
        console.table(data)
	  	console.log("---------------------------------------------------------------------\n");

	  	promptUserPurchase();
	})
}

// Runs the brains of the app
function runBamazon() {

	// Inventory
    displayInventory();
    

    // Gotta figure out how to make the manager part work.
    
// var answers = ["yes", "no"]
// function updateInventory() {
//     inquirer.prompt([
//         {
//             type: "input",
//             name: "inventory",
//             message: "Are you a manager that wants to update quantity?",
//             validate: updateInventory
//         }]).then(function(input) {
//         if (input === "yes") {
//             console.log("Updating quantities...\n");
//             var update = input.item_id
//             var query = connection.query(
//               "UPDATE products SET ? WHERE ?",
//               [
//                 {
//                   quantity: 10
//                 },
//                 {
//                   selection: update
//                 }
//               ],
//               function(err, res) {
//                 console.log(res.update + " products updated!\n");
//               }
//             );
          
//             // logs the actual query being run
//             console.log(query.sql);
//           }
// }
// }
}




// Run program
runBamazon();
// updateInventory() 