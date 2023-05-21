const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const Game = require('../types/Game');

const app = express();

// Handle middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.RDS_URL,
  database: 'NHL',
  user: 'admin',
  password: 'password',
});

// Handle game GET route for all games
app.get('/games/', async (req, res) => {
  try {
    const query = 'SELECT * FROM game';
    const [rows] = await pool.query(query);
    const games = [...rows];
    const response = {
      data: games,
      message: 'All games successfully retrieved.',
    };
    res.send(response);
  } catch (err) {
    const response = { data: null, message: err.message };
    res.send(response);
  }
});

// Handle game GET route for specific game
app.get('/game/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const query = `SELECT * FROM game WHERE id=${id}`;
    const [rows] = await pool.query(query);
    const game = rows[0];
    const response = {
      data: game,
      message: `Game ${game.gamePk} successfully retrieved.`,
    };
    res.status(200).send(response);
  } catch (err) {
    const response = { data: null, message: err.message };
    res.send(response);
  }
});

// Handle in-valid route
app.all('*', function(req, res) {
  const response = { data: null, message: 'Route not found!!' };
  res.status(400).send(response);
});

// Wrap express app instance with serverless http function
module.exports.handler = serverless(app);
