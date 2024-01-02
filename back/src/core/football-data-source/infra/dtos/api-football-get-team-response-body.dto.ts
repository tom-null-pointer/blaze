import {ApiFootballVenueDto} from "./api-football-venue.dto";
import {ApiFootballPlayerDto} from "./api-football-player.dto";
import {ApiFootballCoachDto} from "./api-football-coach.dto";

export class ApiFootballGetTeamResponseBodyDto {
  team_key: string;
  team_name: string;
  team_country: string;
  team_founded: string;
  team_badge: string;
  venue: ApiFootballVenueDto;
  players: ApiFootballPlayerDto[];

  coaches: ApiFootballCoachDto[];
}