# Liquidity Dashboard

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

4. Access the dashboard at http://localhost:3000

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

Screenshots :
<img width="1292" alt="Screenshot 2025-05-05 at 8 02 02 PM" src="https://github.com/user-attachments/assets/1c513ffa-96de-440c-876f-37a050651b89" />

<img width="1234" alt="Screenshot 2025-05-05 at 8 02 12 PM" src="https://github.com/user-attachments/assets/a7d0688d-1367-4a86-84f5-15480932a4f0" />

<img width="1239" alt="Screenshot 2025-05-05 at 8 02 20 PM" src="https://github.com/user-attachments/assets/745d54f3-5bdb-46ba-bd2e-ccc362b9476d" />

<img width="1256" alt="Screenshot 2025-05-05 at 8 02 28 PM" src="https://github.com/user-attachments/assets/5f0061a2-d54f-4a24-b2fb-5c2c02df511d" />



