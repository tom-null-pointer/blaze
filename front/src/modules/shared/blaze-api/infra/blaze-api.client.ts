import axios, {AxiosInstance} from "axios";
import {TeamModel} from "../../../team/domain/models/team.model";
import {SuccessResponseDto} from "./dtos/success-response.dto";
import {ErrorResponseDto} from "./dtos/error-response.dto";

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
      if (data.code !== 200) { throw new Error('Error trying to fetch teams')}
      return data.payload as TeamModel[];
    } catch (e) {
      if (e instanceof Error) {throw e;}
      throw new Error('Error trying to fetch teams');
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
      if (data.code !== 200) { throw new Error('Error trying to fetch a team by id')}
      return data.payload as TeamModel;
    } catch (e) {
      if (e instanceof Error) {throw e;}
      throw new Error('Error trying to fetch a team by id');
    }
  }
}