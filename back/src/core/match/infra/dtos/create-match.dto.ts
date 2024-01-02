import {CreateTeamDto} from "../../../team/infra/dtos/create-team.dto";

export class CreateMatchDto {
  public apiFootballId?: string;
  public date?: string;
  public time?: string;
  public status?: string;
  public homeTeam?: CreateTeamDto;
  public homeTeamApiId?: string;
  public homeTeamId?: number;
  public awayTeam?: CreateTeamDto;
  public awayTeamApiId?: string;
  public awayTeamId?: number;
  public homeTeamScore?: string;
  public homeTeamHalfTimeScore?: string;
  public awayTeamScore?: string;
  public awayTeamHalfTimeScore?: string;
  public homeTeamExtraScore?: string;
  public awayTeamExtraScore?: string;
  public homeTeamPenaltyScore?: string;
  public awayTeamPenaltyScore?: string;
  public homeTeamFtScore?: string;
  public awayTeamFtScore?: string;
  public homeTeamSystem?: string;
  public awayTeamSystem?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public active?: boolean;


  constructor(apiFootballId?: string, date?: string,
    time?: string,
    status?: string,
    homeTeam?: CreateTeamDto,
    homeTeamApiId?: string,
    homeTeamId?: number,
    awayTeam?: CreateTeamDto,
    awayTeamApiId?: string,
    awayTeamId?: number,
    homeTeamScore?: string,
    homeTeamHalfTimeScore?: string,
    awayTeamScore?: string,
    awayTeamHalfTimeScore?: string,
    homeTeamExtraScore?: string,
    awayTeamExtraScore?: string,
    homeTeamPenaltyScore?: string,
    awayTeamPenaltyScore?: string,
    homeTeamFtScore?: string,
    awayTeamFtScore?: string,
    homeTeamSystem?: string,
    awayTeamSystem?: string,
    createdAt?: Date,
    updatedAt?: Date,
    active?: boolean
  ) {
    this.apiFootballId = apiFootballId;
    this.date = date;
    this.time = time;
    this.status = status;
    this.homeTeam = homeTeam;
    this.homeTeamApiId = homeTeamApiId;
    this.homeTeamId = homeTeamId;
    this.awayTeam = awayTeam;
    this.awayTeamApiId = awayTeamApiId;
    this.awayTeamId = awayTeamId;
    this.homeTeamScore = homeTeamScore;
    this.homeTeamHalfTimeScore = homeTeamHalfTimeScore;
    this.awayTeamScore = awayTeamScore;
    this.awayTeamHalfTimeScore = awayTeamHalfTimeScore;
    this.homeTeamExtraScore = homeTeamExtraScore;
    this.awayTeamExtraScore = awayTeamExtraScore;
    this.homeTeamPenaltyScore = homeTeamPenaltyScore;
    this.awayTeamPenaltyScore = awayTeamPenaltyScore;
    this.homeTeamFtScore = homeTeamFtScore;
    this.awayTeamFtScore = awayTeamFtScore;
    this.homeTeamSystem = homeTeamSystem;
    this.awayTeamSystem = awayTeamSystem;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.active = active;
  }
}