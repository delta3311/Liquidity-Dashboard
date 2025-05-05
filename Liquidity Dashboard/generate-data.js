const fs = require('fs');
const path = require('path');

const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

const getDates = () => {
  const dates = [];
  const today = new Date();
  
  for (let i = 60; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    if (date.getDay() !== 0 && date.getDay() !== 6) {
      dates.push(date.toISOString().split('T')[0]);
    }
  }
  
  return dates;
};


const toCsv = (data) => {
  const headers = Object.keys(data[0]).join(',');
  const rows = data.map(row => Object.values(row).join(','));
  return [headers, ...rows].join('\n');
};

console.log('Creating sample data...');
const dates = getDates();

let nifty = 18500;
let midcap = 32500;
const marketData = dates.map(date => {
  nifty += (Math.random() - 0.5) * 100;
  midcap += (Math.random() - 0.5) * 200;
  const vix = 10 + Math.random() * 20;
  const volume = 20000 + Math.random() * 10000;
  
  return {
    date,
    nifty50: nifty.toFixed(2),
    midcap100: midcap.toFixed(2),
    vix: vix.toFixed(2),
    volume: volume.toFixed(2)
  };
});

const flowData = dates.map(date => {
  const fiiBuy = (15000 + Math.random() * 5000).toFixed(2);
  const fiiSell = (15000 + Math.random() * 5000).toFixed(2);
  const diiBuy = (12000 + Math.random() * 5000).toFixed(2);
  const diiSell = (12000 + Math.random() * 5000).toFixed(2);
  
  return {
    date,
    fii_buy: fiiBuy,
    fii_sell: fiiSell,
    fii_net: (fiiBuy - fiiSell).toFixed(2),
    dii_buy: diiBuy,
    dii_sell: diiSell,
    dii_net: (diiBuy - diiSell).toFixed(2)
  };
});

const amfiData = dates.map(date => {
  return {
    date,
    cash_percent: (3 + Math.random() * 7).toFixed(2),
    total_aum: (35 + Math.random() * 3).toFixed(2)
  };
});

fs.writeFileSync(path.join(dataDir, 'nse_data.csv'), toCsv(marketData));
fs.writeFileSync(path.join(dataDir, 'fii_dii_data.csv'), toCsv(flowData));
fs.writeFileSync(path.join(dataDir, 'amfi_data.csv'), toCsv(amfiData));

console.log('Done! Sample data created successfully.');