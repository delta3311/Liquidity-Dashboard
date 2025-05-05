import fs from "fs";
import path from "path";


const ensureDataDirectory = () => {
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  return dataDir;
};

const generateDates = () => {
  const dates = [];
  const today = new Date();

  for (let i = 90; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    const day = date.getDay();
    if (day === 0 || day === 6) {
      continue;
    }

    const formattedDate = date.toISOString().split("T")[0];
    dates.push(formattedDate);
  }

  return dates;
};

const generateNseData = (dates) => {
  let nifty50Base = 18500;
  let midcap100Base = 32500;
  let vixBase = 15;
  let volumeBase = 25000;

  const nseData = dates.map((date) => {
    nifty50Base += (Math.random() - 0.48) * 100;
    midcap100Base += (Math.random() - 0.48) * 200;
    vixBase += (Math.random() - 0.5) * 1.5;
    vixBase = Math.max(10, Math.min(30, vixBase));
    volumeBase += (Math.random() - 0.5) * 1000;
    volumeBase = Math.max(20000, Math.min(35000, volumeBase));

    return {
      date,
      nifty50: parseFloat(nifty50Base.toFixed(2)),
      midcap100: parseFloat(midcap100Base.toFixed(2)),
      vix: parseFloat(vixBase.toFixed(2)),
      volume: parseFloat(volumeBase.toFixed(2)),
    };
  });

  return nseData;
};

const generateFiiDiiData = (dates) => {
  const flowData = dates.map((date) => {
    const fii_buy = parseFloat((15000 + Math.random() * 8000).toFixed(2));
    const fii_sell = parseFloat((15000 + Math.random() * 8000).toFixed(2));
    const dii_buy = parseFloat((12000 + Math.random() * 6000).toFixed(2));
    const dii_sell = parseFloat((12000 + Math.random() * 6000).toFixed(2));

    return {
      date,
      fii_buy,
      fii_sell,
      fii_net: parseFloat((fii_buy - fii_sell).toFixed(2)),
      dii_buy,
      dii_sell,
      dii_net: parseFloat((dii_buy - dii_sell).toFixed(2)),
    };
  });

  return flowData;
};

const generateAmfiData = (dates) => {
  let cashPercentBase = 5;

  const amfiData = dates.map((date) => {
    cashPercentBase += Math.random() - 0.5;
    cashPercentBase = Math.max(3, Math.min(10, cashPercentBase));

    return {
      date,
      cash_percent: parseFloat(cashPercentBase.toFixed(2)),
      total_aum: parseFloat((35 + Math.random() * 3).toFixed(2)), 
    };
  });

  return amfiData;
};


const convertToCSV = (data) => {
  if (!data || data.length === 0) {
    return "";
  }

  const headers = Object.keys(data[0]);
  const csvRows = [headers.join(",")];

  for (const row of data) {
    const values = headers.map((header) => row[header]);
    csvRows.push(values.join(","));
  }

  return csvRows.join("\n");
};


const saveData = (data, filename) => {
  const dataDir = ensureDataDirectory();
  const filePath = path.join(dataDir, filename);
  const csvData = convertToCSV(data);

  fs.writeFileSync(filePath, csvData, "utf8");
  console.log(`Data saved to ${filePath}`);
};


const generateAllData = () => {
  const dates = generateDates();

  const nseData = generateNseData(dates);
  saveData(nseData, "nse_data.csv");

  const fiiDiiData = generateFiiDiiData(dates);
  saveData(fiiDiiData, "fii_dii_data.csv");

  const amfiData = generateAmfiData(dates);
  saveData(amfiData, "amfi_data.csv");

  console.log("Sample data generation complete!");
};


generateAllData();
