import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, DB_URI, PORT, SECRET_KEY, JWT_SECRET, JWT_EXPIRES_IN, LOG_FORMAT, LOG_DIR, ORIGIN, URL } = process.env;