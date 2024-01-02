import {injectable} from "inversify";
import {Repository} from "typeorm";
import {pgDatasource} from "../../../../main";
import {IPlayerDetailRepository} from "../../domain/interfaces/player-detail-repository.interface";
import {CreatePlayerDetailDto} from "../dtos/create-player-detail.dto";
import {PlayerDetail} from "../../domain/entities/player-detail.entity";
import {InternalServerException} from "../../../../shared/errors/internal-server.exception";

@injectable()
export class PgPlayerDetailRepository implements IPlayerDetailRepository {
  private readonly CHUNK_SIZE = 1000;
  private readonly playerDetailRepo: Repository<PlayerDetail> = pgDatasource.getRepository(PlayerDetail);
  async upsert(createPlayerDetailDtos: CreatePlayerDetailDto[]): Promise<PlayerDetail[]> {
    try {
      const result: PlayerDetail[] = [];
      for (let i = 0; i < createPlayerDetailDtos.length; i += this.CHUNK_SIZE) {
        const chunk = createPlayerDetailDtos.slice(i, i + this.CHUNK_SIZE)
        const resultChunk = await this.playerDetailRepo.createQueryBuilder('pd')
          .insert()
          .into(PlayerDetail)
          .values(chunk)
          .orUpdate(['value', 'updatedAt', 'active'], ['typeId', 'playerId'])
          .returning(['id', 'value', 'typeId', 'playerId', 'createdAt', 'updatedAt', 'active'])
          .execute();
        result.push(...(resultChunk.generatedMaps as PlayerDetail[]))
      }
      return result;
    } catch (e) {
      console.error(e);
      throw new InternalServerException('Error trying to store player details');
    }
  }
}