import { DataSource } from "typeorm";
import {Environments} from "../shared/enums/environments.enum";
export class PGDatasource extends DataSource {
    constructor(){
        super({
            type: 'postgres',
            host: process.env.PG_DATASOURCE_HOST,
            port: parseInt(process.env.PG_DATASOURCE_PORT),
            username: process.env.PG_DATASOURCE_USER,
            password: process.env.PG_DATASOURCE_PASS,
            database: process.env.PG_DATASOURCE_DB_NAME,
            synchronize: true,
            logging: process.env.NODE_ENV !== Environments.PROD ? process.env.PG_DATASOURCE_LOGGING === 'true' : false,
            entities: ["src/**/*.entity.ts"],
            subscribers: [],
            migrations: [],
        });
    }
}
