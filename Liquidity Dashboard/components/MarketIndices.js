import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MarketIndices = ({ refreshFlag, dateRange }) => {
  const [marketData, setMarketData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    
    fetch('/api/market-indices')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch market data');
        }
        return response.json();
      })
      .then(data => {
        setMarketData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [refreshFlag]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!marketData || !marketData.dates) {
    return <div>No data available</div>;
  }

  const chartData = {
    labels: marketData.dates,
    datasets: [
      {
        label: 'Nifty 50',
        data: marketData.nifty50,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Midcap 100',
        data: marketData.midcap100,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ]
  };
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Market Indices',
      },
    },
  };

  const lastIndex = marketData.dates.length - 1;
  const lastNifty = marketData.nifty50[lastIndex] || 0;
  const lastMidcap = marketData.midcap100[lastIndex] || 0;
  const lastVix = marketData.vix[lastIndex] || 0;
  
  const firstIndex = 0;
  const niftyChange = ((lastNifty / marketData.nifty50[firstIndex]) - 1) * 100;
  const midcapChange = ((lastMidcap / marketData.midcap100[firstIndex]) - 1) * 100;

  return (
    <div>
      <div className="chart-container">
        <Line options={options} data={chartData} />
      </div>
      
      <div className="stats" style={{ marginTop: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div style={{ padding: '10px', border: '1px solid #ddd' }}>
            <div>Nifty 50</div>
            <div>{lastNifty.toFixed(2)}</div>
            <div style={{ color: niftyChange >= 0 ? 'green' : 'red' }}>
              {niftyChange >= 0 ? '▲' : '▼'} {Math.abs(niftyChange).toFixed(2)}%
            </div>
          </div>
          
          <div style={{ padding: '10px', border: '1px solid #ddd' }}>
            <div>Midcap 100</div>
            <div>{lastMidcap.toFixed(2)}</div>
            <div style={{ color: midcapChange >= 0 ? 'green' : 'red' }}>
              {midcapChange >= 0 ? '▲' : '▼'} {Math.abs(midcapChange).toFixed(2)}%
            </div>
          </div>
          
          <div style={{ padding: '10px', border: '1px solid #ddd' }}>
            <div>India VIX</div>
            <div>{lastVix.toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketIndices;