import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

const config = {
  host: 'localhost',
  port: 5432,
  database: 'reverb',
  user: process.env.PSQL_USERNAME,
  password: process.env.PSQL_PASSWORD,
};

export default config;
