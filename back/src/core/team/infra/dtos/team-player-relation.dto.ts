export class TeamPlayerRelationDto {
  playerId: number;
  teamId: number;

  constructor(playerId: number, teamId: number) {
    this.playerId = playerId;
    this.teamId = teamId;
  }
}