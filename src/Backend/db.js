const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;
require('dotenv').config();

const db = require("./pharmacy");const cors = require('cors');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

//imports
app.post("/pharmacies", db.register);
app.post("/pharmacylogin", db.login);
app.put('/update', db.updateProduct);
app.patch('/:id/quantity',  db.updateProductQuantity);
app.post("/createproduct" , db.createProduct);
app.get("/getAllproducts", db.getAllProducts)





const auth = require('./auth');

// Product routes with auth middleware
app.post("/createproduct", auth, db.createProduct);
app.get("/products", auth, db.getAllProducts);
app.put("/products/:id", auth, db.updateProduct);
app.patch("/products/:id/quantity", auth, db.updateProductQuantity);


/* app.get("/products", db.getProducts);
app.post("/products", db.createProduct);
app.post("/updateproducts", db.updateProducts);
app.post("/sellproducts", db.sellProducts);
 */
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});