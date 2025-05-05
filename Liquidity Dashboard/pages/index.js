import Head from 'next/head';
import { useState, useEffect } from 'react';
import MarketIndices from '../components/MarketIndices';
import FiiDiiFlows from '../components/FiiDiiFlows';
import CashAllocation from '../components/CashAllocation';

export default function Home() {
  const [riskTolerance, setRiskTolerance] = useState('Medium');
  const [refreshData, setRefreshData] = useState(false);
  const [notification, setNotification] = useState('');
  
  const refreshAllData = () => {
    setRefreshData(true);
    setNotification('Refreshing data...');
    
    setTimeout(() => {
      setRefreshData(false);
      setNotification('Data refreshed successfully!');
      
      setTimeout(() => setNotification(''), 3000);
    }, 1500);
  };
  
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <Head>
        <title>MS Capital Liquidity Dashboard</title>
        <meta name="description" content="Indian market liquidity monitor and allocation tool" />
      </Head>

      {notification && (
        <div style={{ 
          background: '#d4edda', 
          color: '#155724', 
          padding: '10px', 
          borderRadius: '4px',
          marginBottom: '20px'
        }}>
          {notification}
        </div>
      )}

      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '20px',
        padding: '10px',
        background: '#f8f9fa',
        borderRadius: '4px'
      }}>
        <h1 style={{ margin: 0, fontSize: '24px' }}>MS Capital Liquidity Dashboard</h1>
        <div>
          <select 
            value={riskTolerance}
            onChange={(e) => setRiskTolerance(e.target.value)}
            style={{ marginRight: '10px', padding: '5px' }}
          >
            <option value="Low">Low Risk</option>
            <option value="Medium">Medium Risk</option>
            <option value="High">High Risk</option>
          </select>
          <button 
            onClick={refreshAllData}
            disabled={refreshData}
            style={{ padding: '5px 10px' }}
          >
            Refresh Data
          </button>
        </div>
      </header>

      <div style={{ display: 'grid', gap: '20px' }}>
        <div style={{ border: '1px solid #ddd', borderRadius: '4px', padding: '15px' }}>
          <h2>Market Indices</h2>
          <MarketIndices refreshFlag={refreshData} />
        </div>

        <div style={{ border: '1px solid #ddd', borderRadius: '4px', padding: '15px' }}>
          <h2>FII/DII Flows</h2>
          <FiiDiiFlows refreshFlag={refreshData} />
        </div>

        <div style={{ border: '1px solid #ddd', borderRadius: '4px', padding: '15px' }}>
          <h2>Cash Allocation Recommendation</h2>
          <CashAllocation 
            riskTolerance={riskTolerance}
            refreshFlag={refreshData}
          />
        </div>
      </div>

      <footer style={{ 
        marginTop: '40px', 
        textAlign: 'center',
        padding: '10px',
        borderTop: '1px solid #ddd'
      }}>
        <p>© {new Date().getFullYear()} MS Capital Liquidity Dashboard</p>
      </footer>
    </div>
  );
}