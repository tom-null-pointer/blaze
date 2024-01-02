import {injectable} from "inversify";
import {Repository} from "typeorm";
import {pgDatasource} from "../../../../main";
import {IPlayerRepository} from "../../domain/interfaces/player-repository.interface";
import {Player} from "../../domain/entities/player.entity";
import {CreatePlayerDto} from "../dtos/create-player.dto";
import {InternalServerException} from "../../../../shared/errors/internal-server.exception";

@injectable()
export class PgPlayerRepository implements IPlayerRepository{
  private readonly playerRepository: Repository<Player> = pgDatasource.getRepository(Player);
  async upsert(createPlayersDtos: CreatePlayerDto[]): Promise<Player[]> {
    try {
      const result = await this.playerRepository.createQueryBuilder('pl')
        .insert()
        .into(Player)
        .values(createPlayersDtos)
        .orUpdate(['name', 'updatedAt', 'active'], ['key', 'apiPlayerId'])
        .returning(['id', 'apiPlayerId', 'key', 'name', 'updatedAt', 'createdAt', 'active'])
        .execute();
      return result.generatedMaps as Player[];
    } catch (e) {
      console.error(e);
      throw new InternalServerException('Error trying to upsert players.');
    }
  }
}