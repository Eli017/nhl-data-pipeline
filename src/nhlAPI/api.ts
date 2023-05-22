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
  host: process.env.HOST,
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD,
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
app.get('/games/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const query = `SELECT * FROM game WHERE game_pk=${id}`;
    const [rows] = await pool.query(query);
    const game = rows[0];
    const response = {
      data: game,
      message: `Game successfully retrieved.`,
    };
    res.status(200).send(response);
  } catch (err) {
    const response = { data: null, message: err.message };
    res.send(response);
  }
});

// Handle team GET route for all teams
app.get('/teams/', async (req, res) => {
  try {
    const query = 'SELECT * FROM team';
    const [rows] = await pool.query(query);
    const teams = [...rows];
    const response = {
      data: teams,
      message: 'All teams successfully retrieved.',
    };
    res.send(response);
  } catch (err) {
    const response = { data: null, message: err.message };
    res.send(response);
  }
});

// Handle team GET route for specific team
app.get('/teams/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const query = `SELECT * FROM game WHERE team_pk=${id}`;
    const [rows] = await pool.query(query);
    const team = rows[0];
    const response = {
      data: team,
      message: `Team successfully retrieved.`,
    };
    res.status(200).send(response);
  } catch (err) {
    const response = { data: null, message: err.message };
    res.send(response);
  }
});

// Handle player GET route for all players
app.get('/players/', async (req, res) => {
  try {
    const query = 'SELECT * FROM player';
    const [rows] = await pool.query(query);
    const players = [...rows];
    const response = {
      data: players,
      message: 'All players successfully retrieved.',
    };
    res.send(response);
  } catch (err) {
    const response = { data: null, message: err.message };
    res.send(response);
  }
});

// Handle player GET route for specific player
app.get('/players/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const query = `SELECT * FROM player WHERE player_pk=${id}`;
    const [rows] = await pool.query(query);
    const player = rows[0];
    const response = {
      data: player,
      message: `Player successfully retrieved.`,
    };
    res.status(200).send(response);
  } catch (err) {
    const response = { data: null, message: err.message };
    res.send(response);
  }
});

// Handle goals GET route for all goals
app.get('/goals/', async (req, res) => {
  try {
    const query = 'SELECT * FROM goal';
    const [rows] = await pool.query(query);
    const goals = [...rows];
    const response = {
      data: goals,
      message: 'All goals successfully retrieved.',
    };
    res.send(response);
  } catch (err) {
    const response = { data: null, message: err.message };
    res.send(response);
  }
});

// Handle goal GET route for specific goal
app.get('/goals/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const query = `SELECT * FROM goal WHERE goal_pk=${id}`;
    const [rows] = await pool.query(query);
    const goal = rows[0];
    const response = {
      data: goal,
      message: `Goal successfully retrieved.`,
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
