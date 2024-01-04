import * as Cron from 'node-cron'
import {ICronJob} from "../interfaces/cron-job.interface";
import {injectable, unmanaged} from "inversify";

@injectable()
export class CronJob implements ICronJob{
  public name?: string;
  private readonly cron: Cron;
  public cronSchedule: string;
  private _action: Function;

  constructor(@unmanaged() cronString: string, @unmanaged() name: string, @unmanaged() action: Function) {
    this.cron = Cron;
    this.cronSchedule = cronString;
    this.name = name;
    this.action = action;
  }

  public set action(actionFunction: Function) {
    this._action = async () => {
      try {
        console.info(`Cronjob Initialized: ${this.name}`);
        await actionFunction();
        console.info(`Cronjob finished without errors: ${this.name}`);
      } catch (e) {
        console.error(e);
      }
    }
  }
  set() {
    try {
      this.cron.schedule(this.cronSchedule, this._action);
    } catch (e) {
      console.error(e);
    }
  }
}