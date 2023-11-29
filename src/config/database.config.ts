import { DB_URL } from '~/config/env.config';

export const dbConnection = {
    url: DB_URL,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
};
