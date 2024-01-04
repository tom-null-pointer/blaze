import {inject, injectable} from "inversify";
import {FindTeamByIdService} from "../domain/services/find-team-by-id.service";
import {BadRequestException} from "../../../shared/errors/bad-request.exception";
import {Team} from "../domain/entities/team.entity";
import {TeamRelationFilters} from "../domain/entities/team-relation-filters.entity";
import {TeamFilter} from "../domain/entities/team-filter.entity";
import {NotFoundException} from "../../../shared/errors/not-found.exception";

@injectable()
export class GetTeamByIdService {
  constructor(
  @inject(FindTeamByIdService) private readonly findTeamByIdService: FindTeamByIdService,
  ) {}
  async get(teamId: number, propertyName: string | undefined, relationFilters: TeamRelationFilters): Promise<Team | {[p: string]: any}> {
    const team = await this.findTeamByIdService.find(new TeamFilter({id:teamId}), relationFilters);
    if (team === null) { throw new NotFoundException(`Team with id ${teamId} not found`); }
    if (propertyName) {
      if (this.isMatchesPropertyName(propertyName)) {
        return this.buildMatchesObject(team);
      }
      this.validateProperty(propertyName, team);
      return this.buildPropertyObject(propertyName, team);
    }
    return team;
  }

  private validateProperty(propertyName: string, team: Team) {
    if (!team[propertyName]) { throw new BadRequestException('Wrong property name.'); }
  }
  private isMatchesPropertyName(property: string) {
    return property === 'matches';
  }
  private buildPropertyObject(propertyName: string, team) {
    return { [propertyName]: team[propertyName] };
  }
  private buildMatchesObject(team: Team) {
    return {
      homeMatches: team.homeMatches,
      awayMatches: team.awayMatches,
    };
  }
}