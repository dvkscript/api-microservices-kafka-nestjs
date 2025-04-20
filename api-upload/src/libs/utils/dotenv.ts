import { config } from 'dotenv';
import * as path from 'path';

const envPath = path.resolve(
  process.cwd(), 
  process.env.NODE_ENV === 'test' ? '.env' : '.env.development.local'
);

config({ path: process.env.NODE_ENV === "production" ? undefined : envPath });