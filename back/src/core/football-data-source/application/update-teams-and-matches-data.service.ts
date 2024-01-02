import {inject, injectable} from "inversify";
import {UpdateTeamsDataService} from "./update-teams-data.service";
import {UpdateMatchesDataService} from "./update-matches-data.service";

@injectable()
export class UpdateTeamsAndMatchesDataService {
  constructor(
    @inject(UpdateTeamsDataService) private readonly updateTeamsDataService: UpdateTeamsDataService,
    @inject(UpdateMatchesDataService) private readonly updateMatchesDataService: UpdateMatchesDataService,
  ) {}

  async update() {
    await this.updateTeamsDataService.update();
    await this.updateMatchesDataService.update();
  }
}