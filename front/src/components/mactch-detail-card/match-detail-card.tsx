import {MatchModel} from "../../modules/match/domain/match.model";
import './match-detail-card.scss';
export function MatchDetailCard({match}: {match: MatchModel}) {
  return (
    <div className="MatchDetailCard">
      <p>{match.homeTeam.name} vs. {match.awayTeam.name} </p>
      <p>{match.date}</p>
      <p>{match.status}</p>
    </div>
  );
}