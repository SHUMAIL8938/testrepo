const express = require('express');
const router = express.Router();

// Deliberately insecure login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  // BAD: raw string interpolation in SQL (should fire DB-001)
  const result = await db.query(`SELECT * FROM users WHERE username = '${username}'`);
  
  // BAD: password stored in plaintext (should fire AUTH-002)
  if (result.rows[0].password === password) {
    res.json({ token: 'hardcoded-jwt-secret' });
  }
});

// BAD: no rate limiting anywhere in this file