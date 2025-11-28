import { readFileSync } from 'fs';

export const loadCsv = (filename: string) => {
  const data = readFileSync(filename, { encoding: 'utf8' }).trim();
  const header: string[] = data.trim().split('\n')[0].trim().split(';');
  const rows: string[][] = [];
  for (const row of data.trim().split('\n').slice(1)) {
    rows.push(row.trim().split(';'));
  }
  return { header, rows };
};
