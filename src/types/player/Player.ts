import CurrentTeam from "./CurrentTeam";
import PrimaryPosition from "./PrimaryPosition";
  
class Player {
    id: number;
    fullName: string;
    link: string;
    firstName: string;
    lastName: string;
    primaryNumber?: string;
    birthDate: string;
    currentAge: number;
    birthCity: string;
    birthStateProvince?: string;
    birthCountry: string;
    nationality: string;
    height: string;
    weight: number;
    active: boolean;
    alternateCaptain: boolean;
    captain: boolean;
    rookie: boolean;
    shootsCatches: string;
    rosterStatus: string;
    currentTeam: CurrentTeam;
    primaryPosition: PrimaryPosition;
};
  
type Players = {
    [id: string]: Player;
};

export default Players;
