import {Request} from "express";
import {inject, injectable} from "inversify";
import {GetTeamByIdService} from "../../application/get-team-by-id.service";
import {BadRequestException} from "../../../../shared/errors/bad-request.exception";
import {GetAllTeamsService} from "../../application/get-all-teams.service";
import {TeamRelationFilters} from "../../domain/entities/team-relation-filters.entity";

@injectable()
export class TeamRestController {
  constructor(
  @inject(GetTeamByIdService) private readonly getTeamsByIdService: GetTeamByIdService,
  @inject(GetAllTeamsService) private readonly getTeamsService: GetAllTeamsService,
  ) {}

  async getTeams() {
    return this.getTeamsService.get(new TeamRelationFilters())
  }
  async getTeamById(req: Request) {
    if (Number.isNaN(req.params.teamId) || !Number.isInteger(+req.params.teamId)) {
      throw new BadRequestException('Param teamId must be an integer.');
    }
    return this.getTeamsByIdService.get(+req.params.teamId, req.params.property, new TeamRelationFilters(true, true, true, true, true));
  }
}