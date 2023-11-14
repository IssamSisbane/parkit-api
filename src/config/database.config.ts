import { NODE_ENV, DB_HOST, DB_PORT, DB_DATABASE, DB_ADMIN_USERNAME, DB_ADMIN_PASSWORD } from '~/config/env.config';

export const dbConnection = {
    url:
        NODE_ENV == 'production'
            ? `mongodb+srv://${DB_ADMIN_USERNAME}:${DB_ADMIN_PASSWORD}@${DB_HOST}/${DB_DATABASE}?retryWrites=true&w=majority`
            : `mongodb://${DB_ADMIN_USERNAME}:${DB_ADMIN_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}?authSource=admin`,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
};
