import fs from 'fs';
import path from 'path';

// Read CSV file and convert to array of objects
export const readCsvFile = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    const lines = data.trim().split('\n');
    const headers = lines[0].split(',');
    
    const result = [];
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',');
      const row = {};
      
      for (let j = 0; j < headers.length; j++) {
        row[headers[j]] = isNaN(values[j]) ? values[j] : Number(values[j]);
      }
      
      result.push(row);
    }
    
    return result;
  } catch (err) {
    console.error('Error reading file:', err);
    return [];
  }
};

// Load market data from CSV files
export const loadMarketIndicesData = () => {
  return readCsvFile(path.join(process.cwd(), 'data', 'nse_data.csv'));
};

export const loadInstitutionalFlowData = () => {
  return readCsvFile(path.join(process.cwd(), 'data', 'fii_dii_data.csv'));
};

export const loadAmfiData = () => {
  return readCsvFile(path.join(process.cwd(), 'data', 'amfi_data.csv'));
};

// Calculate cash allocation based on simple rules
export const calculateCashAllocation = (features, riskTolerance = 'Medium') => {
  // Risk profiles
  const riskFactors = {
    'Low': { base: 15, vixFactor: 0.5, fiiFactor: 0.3, diiFactor: 0.2 },
    'Medium': { base: 10, vixFactor: 0.4, fiiFactor: 0.4, diiFactor: 0.2 },
    'High': { base: 5, vixFactor: 0.3, fiiFactor: 0.5, diiFactor: 0.2 }
  };
  
  const factors = riskFactors[riskTolerance];
  
  // Simple allocation calculation
  const allocations = features.map(day => {
    let allocation = factors.base;
    
    // Increase allocation if market is volatile
    if (day.vix > 20) {
      allocation += factors.vixFactor * 10;
    }
    
    // Increase allocation if FIIs are selling
    if (day.fii_net_flow < 0) {
      allocation += factors.fiiFactor * 10;
    }
    
    // Increase allocation if DIIs are selling
    if (day.dii_net_flow < 0) {
      allocation += factors.diiFactor * 10;
    }
    
    return Math.min(30, allocation); // Cap at 30%
  });
  
  // Feature importance for display
  const feature_importance = {
    vix: factors.vixFactor,
    fii_flow: factors.fiiFactor,
    dii_flow: factors.diiFactor,
    volume: 0.1,
    nifty_perf: 0.1,
    midcap_perf: 0.1
  };
  
  return { allocations, feature_importance };
};

// Combine market data with flow data
export const processDataForCashAllocation = () => {
  const marketData = loadMarketIndicesData();
  const flowData = loadInstitutionalFlowData();
  
  if (!marketData.length || !flowData.length) {
    return [];
  }
  
  const result = [];
  
  for (const market of marketData) {
    const flow = flowData.find(f => f.date === market.date);
    
    if (flow) {
      result.push({
        date: market.date,
        vix: market.vix,
        volume: market.volume,
        nifty50: market.nifty50,
        midcap100: market.midcap100,
        fii_net_flow: flow.fii_net,
        dii_net_flow: flow.dii_net
      });
    }
  }
  
  return result;
};