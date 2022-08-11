import React from 'react';
import { createRoot } from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import Chart from 'chart.js/auto';
import HomePage from './components/HomePage';

Chart.defaults.color = 'white';

const root = createRoot(document.getElementById('root'));

function App() {
  return (
    <RecoilRoot>
      <HomePage />
    </RecoilRoot>
  );
}

root.render(<App />);
