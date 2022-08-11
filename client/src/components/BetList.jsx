import React, { useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import axios from 'axios';
import { userIDState, updateBetListState, myBetsState } from '../atoms';
import EachBet from './EachBet';

function BetList() {
  const [myBets, setMyBets] = useRecoilState(myBetsState);
  const userID = useRecoilValue(userIDState);
  const updateBetList = useRecoilValue(updateBetListState);
  useEffect(() => {
    axios.get(`/myBets/${userID}`)
      .then((res) => {
        console.log('bet data: ', res.data);
        setMyBets(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [updateBetList]);

  return (
    <span>
      <h3>Bet List</h3>
      <ul>
        {myBets.length > 0 ? myBets.map((bet) => (
          <EachBet key={bet.bet_id} bet={bet} />
        )) : null}
      </ul>
    </span>
  );
}

export default BetList;
