import fs from 'fs'
import XLSX from 'xlsx';
import { data } from '../src/lib/assets/datasets/uk-brands/preview.js'


function writeCsv(data) {
  const headers = Object.keys(data[0]).join(',');
  const rows = data.map(obj =>
    Object.values(obj)
      .map(v => `"${String(v).replace(/"/g, '""')}"`) // escape quotes
      .join(',')
  );

  const csv = [headers, ...rows].join('\n');

  fs.writeFileSync('tmp/output.csv', csv, 'utf8');
  console.log('CSV file written!');
}

function writeJson(data) {
  fs.writeFileSync('tmp/output.json', JSON.stringify(data, null, 2), 'utf8');
  console.log('JSON file written!');
}

function writeXlsx(data) {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'UK Clothing Brands');
  XLSX.writeFile(wb, 'tmp/output.xlsx');
  console.log('XLSX file written!');
}

// writeCsv(data);
// writeJson(data);  
// writeXlsx(data);