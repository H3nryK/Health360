const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Health360",
  password: "1234",
  port: 5432,
});

const register = async (req, res) => {
  try {
    // 1. Validate input matches schema
    const { 
      pharmacy_name,   // Frontend uses pharmacy_name
      licenseNumber,   // Frontend uses licenseNumber
      owner_name,      // Frontend uses owner_name
      email,
      phone,
      address,
      password,
      latitude,
      longitude
    } = req.body;

    // Convert frontend fields to match backend database schema
    const license_number = licenseNumber; // Map licenseNumber to license_number for DB
    const pharmacyName = pharmacy_name;  // Map pharmacy_name to match naming
    // owner_name is already aligned

    // 2. Check for required fields
    if (!pharmacyName || !license_number || !owner_name || !email || !phone || !address || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // 3. Check existing pharmacy
    const existingPharmacy = await pool.query(
      'SELECT * FROM pharmacies WHERE license_number = $1 OR email = $2',
      [license_number, email]
    );

    if (existingPharmacy.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Pharmacy with this license number or email already exists'
      });
    }

    // 4. Hash password and insert
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO pharmacies (
        pharmacy_name, 
        license_number, 
        owner_name, 
        email, 
        phone, 
        address, 
        password, 
        latitude, 
        longitude
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
      RETURNING id, pharmacy_name, license_number, email`,
      [
        pharmacyName,    // Use mapped field
        license_number,  // Use mapped field
        owner_name,
        email,
        phone,
        address,
        hashedPassword,
        latitude || null,
        longitude || null
      ]
    );

    return res.status(201).json({
      success: true,
      message: 'Pharmacy registered successfully',
      pharmacy: result.rows[0]
    });

  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: error.message
    });
  }
};

//login

const { JWT_SECRET } = require('./config');

const login = async (req, res) => {
  try {
    const { license_number, password } = req.body;
    console.log('Login attempt:', { license_number, password });

    // Validate fields
    if (!license_number || !password) {
      return res.status(400).json({
        success: false,
        message: 'License number and password are required'
      });
    }

    // Check pharmacy exists
    const existingPharmacy = await pool.query(
      'SELECT * FROM pharmacies WHERE license_number = $1',
      [license_number]
    );

    if (existingPharmacy.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: `No pharmacy found with license number: ${license_number}`
      });
    }

    const pharmacy = existingPharmacy.rows[0];

    // Verify password
    const validPassword = await bcrypt.compare(password, pharmacy.password);
    console.log('Password verification result:', validPassword);

    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid password'
      });
    }

    // Generate token with imported secret
    const token = jwt.sign(
      { 
        id: pharmacy.id,
        license_number: pharmacy.license_number,
        pharmacy_name: pharmacy.pharmacy_name
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log('Token generated successfully');

    return res.status(200).json({
      success: true,
      token,
      pharmacy: {
        id: pharmacy.id,
        pharmacy_name: pharmacy.pharmacy_name,
        license_number: pharmacy.license_number,
        email: pharmacy.email,
        address: pharmacy.address,
        phone: pharmacy.phone
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during login',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};



const getAllProducts = async (req, res) => {
  try {
    if (!req.pharmacy || !req.pharmacy.id) {
      throw new Error("Pharmacy ID is missing in request context");
    }

    const products = await pool.query(
      "SELECT * FROM products WHERE pharmacy_id = $1 ORDER BY name",
      [req.pharmacy.id]
    );

    res.json({
      success: true,
      data: products.rows,
    });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const cloudinary = require('./cloudinary');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const createProduct = async (req, res) => {
  try {
      // Log incoming request
      console.log('Request body:', req.body);
      console.log('Auth token:', req.headers.authorization);
      console.log('Pharmacy ID:', req.pharmacyId);

      // Validate required fields
      const { name, price, quantity } = req.body;
      if (!name || !price || !quantity) {
          return res.status(400).json({
              success: false,
              message: 'Name, price and quantity are required'
          });
      }

      const query = `
          INSERT INTO products (
              name, description, price, quantity, 
              category, brand, threshold, pharmacy_id, 
              created_at, updated_at
          ) 
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW()) 
          RETURNING *
      `;

      const values = [
          name,
          req.body.description || '',
          parseFloat(price),
          parseInt(quantity),
          req.body.category || '',
          req.body.brand || '',
          parseInt(req.body.threshold) || 0,
          req.pharmacyId
      ];

      // Log query details
      console.log('Query:', query);
      console.log('Values:', values);

      const newProduct = await pool.query(query, values);
      console.log('Created product:', newProduct.rows[0]);

      res.status(201).json({
          success: true,
          data: newProduct.rows[0]
      });

  } catch (err) {
      console.error('Error creating product:', err);
      res.status(500).json({ 
          success: false,
          message: err.message 
      });
  }
};



// Update product quantity only
const updateProductQuantity = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  try {
      const query = `
          UPDATE products 
          SET quantity = $1, updated_at = NOW()
          WHERE id = $2 AND pharmacy_id = $3
          RETURNING *
      `;

      const updatedProduct = await pool.query(query, [
          parseInt(quantity),
          id,
          req.pharmacy.id
      ]);

      if (updatedProduct.rows.length === 0) {
          return res.status(404).json({ message: 'Product not found' });
      }

      res.json({
          success: true,
          data: updatedProduct.rows[0],
          message: 'Quantity updated successfully'
      });
  } catch (err) {
      console.error('Error updating quantity:', err);
      res.status(400).json({ 
          success: false,
          message: err.message 
      });
  }
};

module.exports = {
  register,
  login,
 // updateProduct,
    updateProductQuantity,
    createProduct,
    getAllProducts
 /*  createProduct,
  updateProducts,
  sellProducts, */
};
