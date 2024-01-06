export class TeamRelationFilters {
  venues?: boolean;
  players?: boolean | {details: boolean | {type: boolean}};
  homeMatches?: boolean | {homeTeam?: boolean, awayTeam?: boolean};
  awayMatches?: boolean | {homeTeam?: boolean, awayTeam?: boolean};
  coaches?: boolean;

  constructor(venues?: boolean, players?: boolean | {details: boolean | {type: boolean}}, homeMatches?: boolean | {homeTeam?: boolean, awayTeam?: boolean}, awayMatches?: boolean | {homeTeam?: boolean, awayTeam?: boolean}, coaches?: boolean) {
    this.venues = venues;
    this.players = players;
    this.homeMatches = homeMatches;
    this.awayMatches = awayMatches;
    this.coaches = coaches;
  }
}