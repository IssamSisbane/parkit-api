import { DB_HOST, DB_PORT, DB_DATABASE, DB_ADMIN_USERNAME, DB_ADMIN_PASSWORD } from '~/config/env.config';

export const dbConnection = {
    url: `mongodb+srv://${DB_ADMIN_USERNAME}:${DB_ADMIN_PASSWORD}@${DB_HOST}/${DB_DATABASE}?retryWrites=true&w=majority`,
    //url: `mongodb://${DB_ADMIN_USERNAME}:${DB_ADMIN_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}?authSource=admin`,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
};
