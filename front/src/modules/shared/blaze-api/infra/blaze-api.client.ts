import axios, {AxiosInstance} from "axios";
import {TeamModel} from "../../../team/domain/models/team.model";
import {SuccessResponseDto} from "./dtos/success-response.dto";
import {ErrorResponseDto} from "./dtos/error-response.dto";
import {BlazeApiException} from "../../error/blaze-api.exception";
import {BaseException} from "../../error/base.exception";
import {UnknownErrorException} from "../../error/unknown-error.exception";

export class BlazeApiClient {
  private readonly BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
  private readonly PATH_TEAMS = '/teams';
  private readonly axios: AxiosInstance;
  // private readonly token?: string;
  constructor(
    // token?: string
  ) {
    // this.token = token;
    this.axios = axios.create({
      baseURL: this.BASE_URL,
      timeout: 3000,
      // headers: {
      //   'Authorization': this.token ? `Bearer ${this.token}` : undefined,
      // }
    });
  }

  async getTeams(withAllRelations: boolean): Promise<TeamModel[]> {
    try {
      const {data} = await this.axios.get<SuccessResponseDto<TeamModel[]> | ErrorResponseDto<undefined>>(this.PATH_TEAMS, {
        params: {allRelations: withAllRelations}
      });
      if (data.code !== 200) { throw new BlazeApiException('Sorry, we are having some troubles. Please, try again in a few minutes.', `Error trying to fetch teams. Status Code is not 200. Current Status Code: ${data.code}`)}
      return data.payload as TeamModel[];
    } catch (e) {
      if (e instanceof BaseException) {throw e;}
      throw new UnknownErrorException('Error trying to fetch teams', e);
    }
  }

  async getTeamById(userId: number): Promise<TeamModel> {
    try {
      const {data} = await this.axios.get<SuccessResponseDto<TeamModel[]> | ErrorResponseDto<undefined>>(
        `${this.PATH_TEAMS}/${userId}`,
        {
          timeout: 10000,
        }
      );
      if (data.code !== 200) { throw new BlazeApiException("Sorry, there's been an error. Try again in a few minutes.",'Error trying to fetch a team by id'); }
      return data.payload as TeamModel;
    } catch (e) {
      if (e instanceof BaseException) {throw e;}
      throw new UnknownErrorException('Unknown error trying to fetch a team by id.', e);
    }
  }
}