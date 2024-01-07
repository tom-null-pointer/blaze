import {PlayerModel} from "../../modules/player/domain/player.model";
import {PlayerDetailModel} from "../../modules/player-detail/domain/player-detail.model";
import {DetailTypeKeys} from "../../modules/detail-type/domain/enums/detail-type.keys";
import './player-detail.scss';

export function PlayerDetail({player}:{player: PlayerModel}) {
  const groupDetailsByTypeKey = player.details.reduce((detailsGrouped, detail) => {
    detailsGrouped.set(detail.type.key, detail);
    return detailsGrouped;
  }, new Map<string, PlayerDetailModel>())

  return (
    <div className="PlayerDetail">
      <p>{player.name}</p>
      <p>Possition: {groupDetailsByTypeKey.get(DetailTypeKeys.PLAYER_TYPE)?.value || '-'}</p>
      <p>Goals: {groupDetailsByTypeKey.get(DetailTypeKeys.PLAYER_GOALS)?.value || '-'}</p>
    </div>
  )
}