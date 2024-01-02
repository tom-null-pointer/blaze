export class TeamRelationFilters {
  venues?: boolean;
  players?: boolean;
  homeMatches?: boolean;
  awayMatches?: boolean;
  coaches?: boolean;

  constructor(venues?: boolean, players?: boolean, homeMatches?: boolean, awayMatches?: boolean, coaches?: boolean) {
    this.venues = venues;
    this.players = players;
    this.homeMatches = homeMatches;
    this.awayMatches = awayMatches;
    this.coaches = coaches;
  }
}