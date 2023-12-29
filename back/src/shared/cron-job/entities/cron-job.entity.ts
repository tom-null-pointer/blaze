import * as Cron from 'node-cron'
import {ICronJob} from "../interfaces/cron-job.interface";
import {injectable, unmanaged} from "inversify";

@injectable()
export class CronJob implements ICronJob{
  private readonly cron: Cron;
  public cronString: string;
  public action: Function;

  constructor(@unmanaged() cronString: string, @unmanaged() action: Function) {
    this.cron = Cron;
    this.cronString = cronString;
    this.action = action;
  }

  set() {
    this.cron.schedule(this.cronString, this.action);
  }
}