import { processDataForCashAllocation, calculateCashAllocation } from '../../utils/dataUtils';

export default function handler(req, res) {
  try {
    const { risk = 'Medium' } = req.query;
    
    const processedData = processDataForCashAllocation();
    
    if (!processedData || processedData.length === 0) {
      return res.status(404).json({ error: 'No data available for cash allocation calculation' });
    }
    
    const { allocations, feature_importance } = calculateCashAllocation(processedData, risk);
    
    const formattedData = {
      dates: processedData.map(item => item.date),
      allocations: allocations,
      feature_importance: feature_importance
    };
    
    res.status(200).json(formattedData);
  } catch (error) {
    console.error('Error in cash-allocation API:', error);
    res.status(500).json({ error: 'Failed to calculate cash allocation' });
  }
}