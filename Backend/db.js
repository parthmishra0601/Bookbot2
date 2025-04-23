const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Srmist#06',
  database: 'bookbot'
});

db.connect(err => {
  if (err) {
    console.log('DB connection error:', err);
  } else {
    console.log('MySQL connected!');
  }
});

// -------------------- GET APIs --------------------

app.get('/authors', (req, res) => {
  db.query('SELECT * FROM authors', (err, result) => {
    if (err) return res.json({ Error: err });
    return res.json(result);
  });
});

app.get('/books', (req, res) => {
  db.query('SELECT * FROM books', (err, result) => {
    if (err) return res.json({ Error: err });
    return res.json(result);
  });
});

app.get('/cart', (req, res) => {
  db.query('SELECT * FROM cart', (err, result) => {
    if (err) return res.json({ Error: err });
    return res.json(result);
  });
});

app.get('/chatbot_queries', (req, res) => {
  db.query('SELECT * FROM chatbot_queries', (err, result) => {
    if (err) return res.json({ Error: err });
    return res.json(result);
  });
});

app.get('/notifications', (req, res) => {
  db.query('SELECT * FROM notifications', (err, result) => {
    if (err) return res.json({ Error: err });
    return res.json(result);
  });
});

app.get('/orders', (req, res) => {
  db.query('SELECT * FROM orders', (err, result) => {
    if (err) return res.json({ Error: err });
    return res.json(result);
  });
});

app.get('/reviews', (req, res) => {
  db.query('SELECT * FROM reviews', (err, result) => {
    if (err) return res.json({ Error: err });
    return res.json(result);
  });
});

app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, result) => {
    if (err) return res.json({ Error: err });
    return res.json(result);
  });
});

// -------------------- Start Server --------------------
app.listen(3001, () => {
  console.log('Server running on port 3001');
});
