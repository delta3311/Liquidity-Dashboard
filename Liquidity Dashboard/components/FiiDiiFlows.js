import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const FiiDiiFlows = ({ refreshFlag }) => {
  const [flowData, setFlowData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/fii-dii-flows')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch flow data');
        }
        return response.json();
      })
      .then(data => {
        setFlowData(data);
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

  if (!flowData || !flowData.dates) {
    return <div>No data available</div>;
  }

  const chartData = {
    labels: flowData.dates.slice(-30),
    datasets: [
      {
        label: 'FII Net Flow',
        data: flowData.fii_net.slice(-30),
        backgroundColor: 'rgba(53, 162, 235, 0.7)',
      },
      {
        label: 'DII Net Flow',
        data: flowData.dii_net.slice(-30),
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Last 30 Days FII/DII Flows',
      },
    },
  };

  const lastIndex = flowData.dates.length - 1;
  const lastFII = flowData.fii_net[lastIndex] || 0;
  const lastDII = flowData.dii_net[lastIndex] || 0;

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <Bar options={options} data={chartData} />
      </div>
      <div style={{ border: '1px solid #ddd', padding: '10px' }}>
        <p><strong>Latest Flow Stats:</strong></p>
        <p>Latest FII Flow: ₹{lastFII.toFixed(2)} Cr</p>
        <p>Latest DII Flow: ₹{lastDII.toFixed(2)} Cr</p>
      </div>
    </div>
  );
};

export default FiiDiiFlows;