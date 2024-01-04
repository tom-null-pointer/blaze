import '../../shared/utils/config/dotenv-init';
import {PGDatasource} from "./pg.datasource";
export const pgDatasourceInstance = new PGDatasource();