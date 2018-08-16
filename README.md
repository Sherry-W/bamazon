# Bamazon Node.js & MySQL

### Overview

In this activity, we were asked to create an Amazon-like storefront with the MySQL skills we've learned. The app will take in orders from customers and deplete stock from the store's inventory. As a bonus task, we can program our app to track product sales across our store's departments and then provide a summary of the highest-grossing departments in the store.

### Challenge #1: Customer View 

1. The app should then prompt users with two messages.

   * The first should ask them the ID of the product they would like to buy.
   * The second message should ask how many units of the product they would like to buy.

2. Once the customer has placed the order, the application should check if the store has enough of the product to meet the customer's request.

   * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

3. However, if the store _does_ have enough of the product, it should fulfill the customer's order.
   * This means updating the SQL database to reflect the remaining quantity.
   * Once the update goes through, show the customer the total cost of their purchase.

![Video Demo](./Customer_View.webm)
     OR
[Demo of Customer View](https://drive.google.com/file/d/1Q5hQ3ry6T5qhZsdn8iv_kejkxEMOCiKr/view)

### Challenge #2: Manager View

  * If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.

  * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.

  * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.

  * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.

![Video Demo](./Manager_View.webm)
     OR
[Demo of Manager View](https://drive.google.com/file/d/1yi_WWogXru4m76WCcq3TkrLFgwyZs3Wb/view)

### Challenge #3: Supervisor View

1. When a supervisor selects `View Product Sales by Department`, the app should display a summarized table in their terminal/bash window. Use the table below as a guide.

| department_id | department_name | over_head_costs | product_sales | total_profit |
| ------------- | --------------- | --------------- | ------------- | ------------ |
| 01            | Electronics     | 10000           | 20000         | 10000        |
| 02            | Clothing        | 60000           | 100000        | 40000        |

![Video Demo](./Supervisor_View.webm)
     OR
[Demo of Supervisor View](https://drive.google.com/file/d/1XvgrQ2PX3xM5FAHMQvfWon_pyfRwo3-m/view)