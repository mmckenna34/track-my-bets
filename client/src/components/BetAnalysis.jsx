import React from 'react';
import { useRecoilValue } from 'recoil';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart } from 'react-chartjs-2';
import { myBetsState } from '../atoms';

function BetAnalysis() {
  const myBets = useRecoilValue(myBetsState);
  const betTitles = myBets.map((bet) => bet.event);
  const betSize = myBets.map((bet) => bet.betsize);
  let total = 0;
  const profit = myBets.map((bet) => {
    if (bet.won === null) {
      return Math.round(total * 100) / 100;
    }
    if (bet.won === false) {
      total -= bet.betsize;
      return Math.round(total * 100) / 100;
    }
    let winnings;
    if (Number(bet.line) > 0) {
      winnings = (Math.abs(Number(bet.line)) / 100) * bet.betsize;
    } else {
      winnings = (100 / Math.abs(Number(bet.line))) * bet.betsize;
    }
    total += winnings;
    return Math.round(total * 100) / 100;
  });
  function barColor() {
    return (ctx) => {
      const standard = 0;
      const net = ctx.raw;
      const color = net > standard ? 'rgba(75, 192, 192, 0.4)' : 'rgba(255, 26, 104, 0.4)';
      return color;
    };
  }
  return (
    <div>
      <Chart
        data={{
          labels: betTitles,
          datasets: [{
            label: 'Net Profit/Loss',
            data: profit,
            type: 'bar',
            pointRadius: 10,
            backgroundColor: barColor(this),
            borderColor: 'white',
            borderWidth: 1,
          },
          {
            label: 'Bet Size',
            data: betSize,
            type: 'line',
            pointRadius: 12,
            backgroundColor: 'darkblue',
            borderColor: 'white',
            borderWidth: 1,
          },
          ],
        }}
        height={500}
        width={400}
        plugins={[ChartDataLabels]}
        options={{
          maintainAspectRatio: false,
          hoverBorderWidth: 5,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            title: {
              display: true,
              text: 'Profit/Loss - Lifetime',
            },
            datalabels: {
              formatter: (value) => `$${value}`,
            },
          },
        }}
      />
    </div>
  );
}

export default BetAnalysis;
