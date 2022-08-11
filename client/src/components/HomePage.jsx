import React, { useEffect } from 'react';
import axios from 'axios';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  addBetState, betListState, currentSportsState, betAnalysisState,
} from '../atoms';
import AddBet from './AddBet';
import BetList from './BetList';
import BetAnalysis from './BetAnalysis';

function HomePage() {
  const [betForm, setBetForm] = useRecoilState(addBetState);
  const [betList, setBetList] = useRecoilState(betListState);
  const [betAnalysis, setBetAnalysis] = useRecoilState(betAnalysisState);
  const setCurrentSports = useSetRecoilState(currentSportsState);

  useEffect(() => {
    axios.get('/allSports')
      .then((res) => {
        setCurrentSports(res.data);
        console.log('Sports in season: ', res.data);
      })
      .catch((err) => {
        console.log('error getting in-season sports: ', err);
      });
  }, []);

  function handleBet(e) {
    e.preventDefault();
    setBetForm(!betForm);
  }

  function handleBetList(e) {
    e.preventDefault();
    setBetList(!betList);
  }

  function handleBetAnalysis(e) {
    e.preventDefault();
    setBetAnalysis(!betAnalysis);
  }

  return (
    <div>
      <h1>Track My Bets</h1>
      <button onClick={handleBet} type="button">Add A Bet</button>
      <button onClick={handleBetList} type="button">See My Bets</button>
      <button onClick={handleBetAnalysis} type="button">Bet Analysis</button>
      {betForm ? <AddBet /> : null}
      {betList ? <BetList /> : null}
      {betAnalysis ? <BetAnalysis /> : null}
    </div>
  );
}

export default HomePage;
