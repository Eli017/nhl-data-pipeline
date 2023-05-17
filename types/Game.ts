import LeagueRecord from "./LeagueRecord";
import Status from "./Status";
import Team from "./Team";

class Game {
    public gamePk: number;
    public link: string;
    public gameType: string;
    public season: string;
    public gameDate: string;
    public status: Status;
    public teams: {
        away: {
            leagueRecord: LeagueRecord;
            score: number;
            team: Team;
        },
        home: {
            leagueRecord: LeagueRecord;
            score: number;
            team: Team;
        }
    };
    public venue: {
        id: number;
        name: string;
        link: string;
    };
    public content: {
        link: string;
    };
};

export default Game;