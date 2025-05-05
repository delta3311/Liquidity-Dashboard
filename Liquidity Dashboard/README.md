# MS Capital Liquidity Dashboard

A comprehensive dashboard for tracking Indian equity market liquidity and providing data-driven cash allocation recommendations based on market indicators.

## Overview

This application provides real-time market intelligence through:
- Market index tracking (Nifty 50, Midcap 100, VIX)
- Institutional flow monitoring (FII/DII)
- Risk-adjusted cash allocation modeling

## Technical Implementation

Built using:
- Next.js for frontend architecture
- React for component-based UI
- Chart.js for data visualization
- Custom algorithms for cash allocation modeling

## Running Locally

1. Install dependencies:
   ```
   npm install
   ```

2. Generate market data:
   ```
   node generate-data.js
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Access the dashboard at http://localhost:5000

## Key Features

- Dynamic risk profiling (Low/Medium/High)
- Custom date range selection
- Component visibility controls
- Interactive data visualizations
- Real-time data updates

## Application Structure

- `pages/` - Core page components and API endpoints
- `components/` - Dashboard visualization modules
- `utils/` - Data processing utilities
- `data/` - Market data CSV files

## Notes

This dashboard currently uses simulated market data for demonstration. In production, it would connect to real-time market data sources from NSE and SEBI APIs.

*Proprietary and Confidential - MS Capital*