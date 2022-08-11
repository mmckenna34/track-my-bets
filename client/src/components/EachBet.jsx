/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import axios from 'axios';

function EachBet({ bet }) {
  const [win, setWin] = useState(false);
  const [loss, setLoss] = useState(false);
  function handleWin(e, betID) {
    e.preventDefault();
    axios.post(`/won/${betID}`)
      .then(() => {
        console.log('DB updated to reflect win.');
        setWin(true);
        setLoss(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLoss(e, betID) {
    e.preventDefault();
    axios.post(`/loss/${betID}`)
      .then(() => {
        console.log('DB updated to reflect loss.');
        setLoss(true);
        setWin(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <li key={bet.bet_id}>
      {`${bet.league}: ${bet.event} - ${bet.market} with odds of ${bet.line} : $${bet.betsize}`}
      <button onClick={(event) => handleWin(event, bet.bet_id)} className="smaller" type="button">{bet.won ? 'WON!' : 'WON?'}</button>
      <button onClick={(event) => handleLoss(event, bet.bet_id)} className="smaller" type="button">{bet.won === false ? 'LOST!' : 'LOST?'}</button>
    </li>
  );
}

export default EachBet;
