/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import { addBetState, currentSportsState, updateBetListState } from '../atoms';

function AddBet() {
  const [betForm, setBetForm] = useRecoilState(addBetState);
  const currentSports = useRecoilValue(currentSportsState);
  const [updateBetList, setUpdateBetList] = useRecoilState(updateBetListState);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    const betData = {
      league: e.target[0].value.split(',')[1],
      event: e.target[1].value,
      market: e.target.market.value,
      line: e.target.line.value,
      betSize: e.target.betSize.value,
    };
    axios.post('/addABet', betData)
      .then(() => {
        console.log('Bet added!');
        e.target.reset();
        setUpdateBetList(updateBetList + 1);
        setBetForm(!betForm);
      })
      .catch((err) => {
        console.log('error posting bet to database: ', err);
      });
  }

  function handleSportSelect(e) {
    e.preventDefault();
    axios.get(`/v4/sports/${e.target.value.split(',')[0]}/scores`)
      .then((res) => {
        console.log('retrieved events data: ', res);
        setUpcomingEvents(res.data);
      })
      .catch((err) => {
        console.log('error getting current/upcoming events: ', err);
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          League:
          <select onChange={handleSportSelect}>
            {currentSports.map((sport) => (
              <option key={sport.key} name="league" value={[sport.key, sport.title]}>{sport.title}</option>
            ))}
          </select>
        </label>
        <label>
          Event:
          <input type="search" name="event" list="eventList" required />
          <datalist id="eventList">
            {upcomingEvents.map((event) => (
              <option key={event.id}>
                {`${event.away_team} @ ${event.home_team} :
              ${new Date(event.commence_time).toLocaleDateString('en-US')}`}
              </option>
            ))}
          </datalist>
        </label>
        <label>
          Market: (ex. Moneyline)
          <input type="text" name="market" required />
        </label>
        <label>
          Line: (ex. +110/-110)
          <input type="text" name="line" required />
        </label>
        <label>
          Bet Size:
          <input type="number" name="betSize" required />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddBet;
