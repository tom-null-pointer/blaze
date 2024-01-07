import React, {useEffect, useState} from "react";
import {SelectInput} from "../../components/select-input/select-input";
import {GetTeamsService} from "../../modules/team/application/get-teams.service";
import {TeamBlazeApiDatasource} from "../../modules/team/infra/team-blaze-api.datasource";
import {BlazeApiClient} from "../../modules/shared/blaze-api/infra/blaze-api.client";
import {TeamModel} from "../../modules/team/domain/models/team.model";
import {TeamDetails} from "../../components/team-details/team-details";
import {GetTeamInfoService} from "../../modules/team/application/get-team-info.service";
import {ITeamDatasource} from "../../modules/team/domain/interfaces/team-datasource.interface";
import './home.scss';
import {UnknownErrorException} from "../../modules/shared/error/unknown-error.exception";
import {BaseException} from "../../modules/shared/error/base.exception";
export function Home() {
  const apiDatasource: ITeamDatasource = new TeamBlazeApiDatasource(new BlazeApiClient());
  const getTeamsService = new GetTeamsService(apiDatasource);
  const getTeamInfoService = new GetTeamInfoService(apiDatasource);
  const [selectedTeam, setSelectedTeam] = useState<TeamModel | null>(null);
  const [teams, setTeams] = useState<TeamModel[]>([]);
  const [error, setError] = useState('');
  const selectChangeHandler = async (ev: React.ChangeEvent<HTMLInputElement>) => {
    const fetchedTeam = await getTeamInfoService.get(+ev.target.value);
    setSelectedTeam(() => fetchedTeam);
  }

  const generateOptionsFromTeams = () => {
    return teams.map(team => ({value: team.id.toString(), label: team.name}))
  }

  const buildErrorMessageIfExist = () => {
    if (error) {
      return <p className="Home__error-message">{error}</p>
    }
    return null;
  }

  const buildResultSection = () => {
    if (selectedTeam === null) { return <p>No team selected :(</p>}
    return <TeamDetails team={selectedTeam} />;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedTeams = await getTeamsService.get();
        setTeams(fetchedTeams);
      } catch (e) {
        let error = e;
        if (!(error instanceof BaseException)) {
          error = new UnknownErrorException('Error fetching teams at home page.',e);
        }
        console.error(error);
        setError((error as BaseException).userMessage);
      }
    }
    fetchData().catch((e) => {
      console.error(e);
      setError(e.message);
    });
  }, []);

  return (
    <div className="Home">
      {buildErrorMessageIfExist()}
      <SelectInput
        options={generateOptionsFromTeams()}
        onChange={selectChangeHandler}
        selectMessage="Select a Team"
        selected={selectedTeam ? selectedTeam.id.toString() : ''}
        noOptionsMessage="No team available, yet..."
      />
      {buildResultSection()}
    </div>
  );
}