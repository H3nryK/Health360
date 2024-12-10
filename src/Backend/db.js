const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;
require('dotenv').config();
const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Health360",
  password: "1234",
  port: 5432,
});


const db = require("./pharmacy");const cors = require('cors');
const setPharmacyContext = require('./setPharmacyContext');

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
/* app.put('/update', db.updateProduct);
app.patch('/:id/quantity',  db.updateProductQuantity);
app.post("/createproduct" , db.createProduct);
app.get("/getAllproducts", db.getAllProducts) */

const auth = require('./auth');


// Product routes with auth middleware
app.post("/createproduct", auth, db.createProduct);
//app.get("/products", auth, setPharmacyContext, db.getAllProducts);
//app.put("/products/:id", auth, db.updateProduct);
app.patch("/products/:id/quantity", auth, db.updateProductQuantity);

console.log(typeof auth); // Should log "function"
console.log(typeof setPharmacyContext); // Should log "function"
console.log(typeof db.getAllProducts); // Should log "function"

/* app.get("/products", db.getProducts);
app.post("/products", db.createProduct);
app.post("/updateproducts", db.updateProducts);
app.post("/sellproducts", db.sellProducts);
 */

app.get('/products', auth, async (req, res) => {
  try {
    const pharmacyId = req.pharmacyId;  // Correct access to pharmacyId

    // Define the query correctly
    const query = 'SELECT * FROM products WHERE pharmacy_id = $1';
    const values = [pharmacyId];  // Use the pharmacyId from the request

    // Execute the query with parameters
    const result = await pool.query(query, values);

    // Log the fetched products to the console
    console.log("Fetched products:", result.rows);

    // Send the result as JSON
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ message: 'Error fetching products' });
  }
});




app.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price, quantity, category } = req.body;

  try {
    // Check if the product exists by checking the ID first
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update the product in the database
    const updateQuery = `
      UPDATE products 
      SET name = $1, price = $2, quantity = $3, category = $4 
      WHERE id = $5 
      RETURNING *;
    `;
    
    const values = [name, price, quantity, category, id];
    
    const updatedProduct = await pool.query(updateQuery, values);
    
    if (updatedProduct.rows.length > 0) {
      res.status(200).json(updatedProduct.rows[0]);
    } else {
      res.status(500).json({ message: 'Failed to update product' });
    }

  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Failed to update product', error: error.message });
  }
});

/* const query = 'SELECT * FROM products WHERE pharmacy_id = $1';
const values = [req.pharmacyId];
const result = await pool.query(query, values); */


app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});