import { loadMarketIndicesData } from '../../utils/dataUtils';

export default function handler(req, res) {
  try {
    const nseData = loadMarketIndicesData();
    
    if (!nseData || nseData.length === 0) {
      return res.status(404).json({ error: 'No market data available' });
    }
    
    const formattedData = {
      dates: nseData.map(item => item.date),
      nifty50: nseData.map(item => item.nifty50),
      midcap100: nseData.map(item => item.midcap100),
      vix: nseData.map(item => item.vix),
      volume: nseData.map(item => item.volume)
    };
    
    res.status(200).json(formattedData);
  } catch (error) {
    console.error('Error in market-indices API:', error);
    res.status(500).json({ error: 'Failed to fetch market data' });
  }
}