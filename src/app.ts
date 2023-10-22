import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from "./config/env.config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { connect, set, disconnect } from "mongoose";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { dbConnection } from "./config/database.config";
import { Route } from "~/interfaces/route.interface";
import errorMiddleware from "~/middlewares/error.middleware";
import cookieParser from "cookie-parser";

class App {
    public app: express.Application;
    public env: string;
    public port: number;

    constructor(routes: Route[]) {
        this.app = express();
        this.env = NODE_ENV || 'development';
        this.port = parseInt(PORT!);

        this.connectToDatabase();
        this.initializeMiddlewares();
        this.initializeSwagger();
        this.initializeRoutes(routes);
        this.initializeErrorHandling();
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`=================================`);
            console.log(`======= ENV: ${this.env} =======`);
            console.log(`🚀 App listening on the port ${this.port}`);
            console.log(`=================================`);
        });
    }

    public async closeDatabaseConnection(): Promise<void> {
        try {
            await disconnect();
            console.log('Disconnected from MongoDB');
        } catch (error) {
            console.error('Error closing database connection:', error);
        }
    }

    public getServer() {
        return this.app;
    }

    private async connectToDatabase() {
        if (this.env !== 'production') {
            set('debug', true);
        }

        await connect(dbConnection.url);
    }

    private initializeMiddlewares() {
        this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
        this.app.use(helmet());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
    }

    private initializeRoutes(routes: Route[]) {
        routes.forEach(route => {
            this.app.use('/', route.router);
        });
    }

    private initializeSwagger() {
        const options = {
            swaggerDefinition: {
                info: {
                    title: 'REST API PARKIT',
                    version: '1.0.0',
                    description: 'Docs',
                },
            },
            apis: ['swagger.yaml'],
        };

        const specs = swaggerJSDoc(options);
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
    }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }


}

export default App;