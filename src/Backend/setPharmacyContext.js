const jwt = require('jsonwebtoken');
const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Health360",
  password: "1234",
  port: 5432,
});


const setPharmacyContext = async (req, res, next) => {
    try {
      // Assuming you have the pharmacy ID in req.user (or wherever it's stored)
      const pharmacyId = req.user.pharmacyId; // Adjust this based on where you're storing the logged-in user's pharmacy ID
      
      // Query to fetch the pharmacy context, e.g., the pharmacy name or other details
      const result = await pool.query(
        'SELECT id, name FROM pharmacies WHERE id = $1', [pharmacyId]
      );
  
      if (result.rows.length > 0) {
        req.pharmacy = result.rows[0];  // Attach the pharmacy context to the request
        next();  // Proceed to the next middleware or route handler
      } else {
        return res.status(404).json({ message: 'Pharmacy not found' });
      }
    } catch (err) {
      console.error('Error in setPharmacyContext middleware:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
 
  module.exports = setPharmacyContext;
  