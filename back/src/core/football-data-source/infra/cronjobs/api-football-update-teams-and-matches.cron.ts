import {inject, injectable} from "inversify";
import {CronJob} from "../../../../shared/cron-job/entities/cron-job";
import {UpdateTeamsAndMatchesDataService} from "../../application/update-teams-and-matches-data.service";

@injectable()
export class ApiFootballUpdateTeamsAndMatchesCron extends CronJob
{
  constructor(
    @inject(UpdateTeamsAndMatchesDataService)
    private readonly updateTeamsAndMatchesDataService: UpdateTeamsAndMatchesDataService,
  ) {
    super(
      '*/2 * * * *',
      'Api Football Teams And Matches',
      () => {}
    );
    this.action = this.updateTeamsAndMatchesDataService.update.bind(this.updateTeamsAndMatchesDataService);
  }
}