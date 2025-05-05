import { loadInstitutionalFlowData } from '../../utils/dataUtils';

export default function handler(req, res) {
  try {
    const flowData = loadInstitutionalFlowData();
    
    if (!flowData || flowData.length === 0) {
      return res.status(404).json({ error: 'No institutional flow data available' });
    }
    
    const formattedData = {
      dates: flowData.map(item => item.date),
      fii_net: flowData.map(item => item.fii_net),
      dii_net: flowData.map(item => item.dii_net),
      fii_buy: flowData.map(item => item.fii_buy),
      fii_sell: flowData.map(item => item.fii_sell),
      dii_buy: flowData.map(item => item.dii_buy),
      dii_sell: flowData.map(item => item.dii_sell)
    };
    
    res.status(200).json(formattedData);
  } catch (error) {
    console.error('Error in fii-dii-flows API:', error);
    res.status(500).json({ error: 'Failed to fetch institutional flow data' });
  }
}