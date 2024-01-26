import { URL } from './env.config';

export const SWAGGER_OPTIONS = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'REST API PARKIT',
            version: '1.0.0',
            description: 'API for the PARKIT PTUT Project',
        },
        servers: [
            {
                url: URL, // Chemin de base
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            },
        }
    },
    apis: ['swagger.yaml']
}
