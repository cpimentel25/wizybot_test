/* eslint-disable prettier/prettier */
import * as fs from 'fs';
import * as path from 'path';
import * as csvParser from 'csv-parser';

const csvFilePath = path.resolve(__dirname, 'products_list.csv');
const jsonFilePath = path.resolve(__dirname, 'products_list.json');

const products = [];

fs.createReadStream(csvFilePath)
  .pipe(csvParser())
  .on('data', (row) => {
    products.push(row);
  })
  .on('end', () => {
    fs.writeFileSync(jsonFilePath, JSON.stringify(products, null, 2));
    console.log('CSV file successfully converted to JSON');
  });
