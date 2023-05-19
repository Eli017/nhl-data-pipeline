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


    public isGameLive (): Boolean {
        return this.status.abstractGameState === 'Live'
    }

    constructor(gamePk: number, link: string, gameType: string, season: string, gameDate: string, status: Status, teams: {
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
      }, venue: {
        id: number;
        name: string;
        link: string;
      }, content: {
        link: string;
      }) {
        this.gamePk = gamePk;
        this.link = link;
        this.gameType = gameType;
        this.season = season;
        this.gameDate = gameDate;
        this.status = status;
        this.teams = teams;
        this.venue = venue;
        this.content = content;
      }
};

export default Game;