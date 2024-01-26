import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, DB_URI, PORT, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN, URL,
    ACCESS_JWT_SECRET, REFRESH_JWT_SECRET, ACCESS_EXPIRES_IN, REFRESH_EXPIRES_IN,
    MQTT_HOST, MQTT_PORT, MQTT_PROTOCOL, MQTT_USERNAME, MQTT_PASSWORD } = process.env;