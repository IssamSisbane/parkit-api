const outputFile = "./swagger_output.json";

const doc = {
    info: {
        title: 'PARKIT API',
        version: '1.0.0',
        description: 'API for the PARKIT PTUT Project',
    },
    host: process.env.HOST || 'localhost:3000',
    basePath: '/api/v1',
    schemes: [process.env.SCHEME || 'http'],
};

