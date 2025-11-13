import fs from 'fs'
import XLSX from 'xlsx';
import { data } from '../src/lib/assets/datasets/uk-brands/preview.js'

let cleanData = [];
for (const entry of data) {
  cleanData.push({
    name: entry.name,
    category: entry.fb_tag,
    phone: entry.phone.replace(/ /g, ''),
    public_email: entry.public_email.toLowerCase(),
    website_url: entry.website_url.toLowerCase(),
    website_monthly_visitors: entry.website_mo_uv,
    ecom_platform: entry.tech_stack,
    meta_ad_count: entry.meta_ad_count,
    fb_link: entry.fb_link,
    fb_reviews: entry.fb_reviews,
    ig_link: entry.ig_link,
    ig_verified: entry.ig_verified == 1 ? 'Yes' : 'No',
    ig_description: entry.ig_desc.replace('... more', ''),
    ig_followers: entry.ig_followers,
    ig_engagement_score: (Math.log10(entry.ig_ER * 500 + 1) + 0.01).toFixed(2),
  });
}

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
}