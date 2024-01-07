import {TeamModel} from "../../modules/team/domain/models/team.model";
import {PlayerDetail} from "../player-detail-card/player-detail";
import './team-details.scss';
import {MatchDetailCard} from "../mactch-detail-card/match-detail-card";
export function TeamDetails({team}:{team: TeamModel}) {
  const matches = [...team.awayMatches, ...team.homeMatches];
  return (
    <div className="TeamDetails">
      <h2>Team Name: {team.name} <img className="TeamDetails__logo" src={team.badge} alt={`${team.name} logo`}/></h2>
      <div className="TeamDetails__country-founded-wrapper">
        <p className="TeamDetails__country">Country: {team.country}</p>
        <p className="TeamDetails__founded">Founded: {team.founded}</p>
      </div>
      <div className="TeamDetails__coaches-venues-wrapper">
        <div className="TeamDetails__coaches">
          <h3>Coaches:</h3>
          <ul>
            {team.coaches.map(coach => <li key={coach.id}>{coach.name}</li>)}
          </ul>
        </div>
        <div className="TeamDetails__venues">
          <h3>Venues:</h3>
          <ul>
            {team.venues.map(venue => <li key={venue.id}>{venue.name}</li>)}
          </ul>
        </div>
      </div>
      <h3>Players:</h3>
      <div className="TeamDetails__players">
        {team.players.map(player => <PlayerDetail key={player.id} player={player} />)}
      </div>
      <h3>Matches:</h3>
      <div className="TeamDetails__matches">
        {matches.map(match => <MatchDetailCard key={match.id} match={match} />)}
      </div>
    </div>
  );
}