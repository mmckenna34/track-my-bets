require('dotenv').config();

const path = require('path');
const express = require('express');
const axios = require('axios');
const db = require('../database/db');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/public')));

app.get('/allSports', (req, res) => {
  axios.request({
    method: req.method,
    url: `https://api.the-odds-api.com/v4/sports/?apiKey=${process.env.API_KEY}`,
    params: req.query,
  }).then((response) => {
    res.status(200).send(response.data);
  }).catch((err) => {
    console.error('API error: ', err);
    res.sendStatus(500);
  });
});

app.get('/v4/sports/:sport/scores', (req, res) => {
  axios.request({
    method: req.method,
    url: `https://api.the-odds-api.com/v4/sports/${req.params.sport}/scores/?apiKey=${process.env.API_KEY}`,
    params: req.query,
  }).then((response) => {
    res.status(200).send(response.data);
  }).catch((err) => {
    console.error('API error: ', err);
    res.sendStatus(500);
  });
});

app.post('/addABet', (req, res) => {
  console.log(req.body);
  db.oneOrNone((`
    INSERT INTO bets(user_id, league, event, market, line, betsize)
      VALUES(1, $1, $2, $3, $4, $5);
  `), [req.body.league, req.body.event, req.body.market, req.body.line, req.body.betSize])
    .then(() => {
      console.log('successs');
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('error posting: ', err);
      res.status(500).send(err);
    });
});

app.post('/won/:betID', (req, res) => {
  db.oneOrNone((`
  UPDATE bets
  SET won = true
  WHERE bet_id = $1;
  `), [req.params.betID])
    .then(() => {
      console.log('success updating win');
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('error posting: ', err);
      res.status(500).send(err);
    });
});

app.post('/loss/:betID', (req, res) => {
  db.oneOrNone((`
  UPDATE bets
  SET won = false
  WHERE bet_id = $1;
  `), [req.params.betID])
    .then(() => {
      console.log('success updating loss');
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('error posting: ', err);
      res.status(500).send(err);
    });
});

app.get('/myBets/:userID', (req, res) => {
  db.manyOrNone((`
  SELECT * FROM bets WHERE user_id=$1;
  `), [req.params.userID])
    .then((data) => {
      console.log('successs');
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log('error posting: ', err);
      res.status(500).send(err);
    });
});

app.use('/*', (req, res) => {
  if (req.baseUrl !== '/favicon.ico') {
    axios.request({
      method: req.method,
      url: req.baseUrl,
      data: req.body,
      params: req.query,
    }).then((response) => {
      res.status(200).send(response.data);
    }).catch((err) => {
      console.error('API error: ', err);
      res.sendStatus(500);
    });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on Port ${process.env.PORT}`);
});
