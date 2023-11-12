import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, PORT, DB_HOST, DB_PORT, DB_DATABASE, DB_ADMIN_USERNAME, DB_ADMIN_PASSWORD, SECRET_KEY, JWT_SECRET, JWT_EXPIRES_IN, LOG_FORMAT, LOG_DIR, ORIGIN, URL } = process.env;