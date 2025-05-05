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

const CashAllocation = ({ riskTolerance, refreshFlag }) => {
  const [allocationData, setAllocationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/cash-allocation?risk=${riskTolerance}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then(data => {
        setAllocationData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [riskTolerance, refreshFlag]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!allocationData || !allocationData.dates) {
    return <div>No data available</div>;
  }

  const chartData = {
    labels: allocationData.dates,
    datasets: [
      {
        label: 'Cash Allocation (%)',
        data: allocationData.allocations,
        borderColor: 'rgb(153, 102, 255)',
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
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
        text: 'Cash Allocation Recommendation',
      },
    },
  };

  const lastIndex = allocationData.dates.length - 1;
  const currentAllocation = allocationData.allocations[lastIndex] || 0;

  const featureImportance = allocationData.feature_importance || {};
  
  const formatName = (name) => {
    return name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div>
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <h3>Current Recommendation</h3>
        <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
          {currentAllocation.toFixed(1)}% Cash
        </div>
        <div>Based on {riskTolerance} Risk Profile</div>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <Line options={options} data={chartData} />
      </div>
      
      <div style={{ border: '1px solid #ddd', padding: '10px' }}>
        <h3>Key Factors</h3>
        
        <div>
          {Object.entries(featureImportance).map(([feature, value]) => (
            <div key={feature} style={{ margin: '5px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{formatName(feature)}</span>
                <span>{(value * 100).toFixed(0)}%</span>
              </div>
              <div style={{ 
                height: '10px', 
                width: `${value * 100}%`, 
                backgroundColor: 'purple', 
                marginTop: '3px' 
              }} />
            </div>
          ))}
        </div>
        
        <p style={{ marginTop: '15px', fontSize: '14px' }}>
          This allocation is based on market conditions including volatility, 
          institutional flows, and index trends.
        </p>
      </div>
    </div>
  );
};

export default CashAllocation;