import { DB_URI } from '~/config/env.config';

export const dbConnection = {
    url: DB_URI,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
};
