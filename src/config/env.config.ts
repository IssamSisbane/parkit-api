import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, DB_URI, PORT, SECRET_KEY, ACCESS_JWT_SECRET, REFRESH_JWT_SECRET, ACCESS_EXPIRES_IN, REFRESH_EXPIRES_IN, LOG_FORMAT, LOG_DIR, ORIGIN, URL } = process.env;