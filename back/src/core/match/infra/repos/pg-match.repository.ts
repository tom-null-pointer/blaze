import {injectable} from "inversify";
import {IMatchRepository} from "../../domain/interfaces/match-repository.interface";
import {Repository} from "typeorm";
import {Match} from "../../domain/domain/match.entity";
import {pgDatasource} from "../../../../main";
import {CreateMatchDto} from "../dtos/create-match.dto";
import {InternalServerException} from "../../../../shared/errors/internal-server.exception";

@injectable()
export class PgMatchRepository implements IMatchRepository {
  private readonly matchRepo: Repository<Match> = pgDatasource.getRepository(Match);
  async upsert(matchDtos: CreateMatchDto[]) {
    try {
      const result = await this.matchRepo.createQueryBuilder('m')
        .insert()
        .into(Match)
        .values(matchDtos)
        .orUpdate([
          'date',
          'time',
          'status',
          'homeTeamId',
          'awayTeamId',
          'homeTeamScore',
          'homeTeamHalfTimeScore',
          'awayTeamScore',
          'awayTeamHalfTimeScore',
          'homeTeamExtraScore',
          'awayTeamExtraScore',
          'homeTeamPenaltyScore',
          'awayTeamPenaltyScore',
          'homeTeamFtScore',
          'awayTeamFtScore',
          'homeTeamSystem',
          'awayTeamSystem',
          'updatedAt',
          'active'
        ], ['apiFootballId'])
        .returning([
          'id',
          'apiFootballId',
          'date',
          'time',
          'status',
          'homeTeamId',
          'awayTeamId',
          'homeTeamScore',
          'homeTeamHalfTimeScore',
          'awayTeamScore',
          'awayTeamHalfTimeScore',
          'homeTeamExtraScore',
          'awayTeamExtraScore',
          'homeTeamPenaltyScore',
          'awayTeamPenaltyScore',
          'homeTeamFtScore',
          'awayTeamFtScore',
          'homeTeamSystem',
          'awayTeamSystem',
          'createdAt',
          'updatedAt',
          'active'
        ])
        .execute();
      return result.generatedMaps as Match[];
    } catch (e) {
      console.error(e);
      throw new InternalServerException('Error trying to upsert matches.');
    }
  }
}