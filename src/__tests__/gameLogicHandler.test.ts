import Game from "../types/Game";

const game = new Game(
    123456,
    "game-link",
    "regular",
    "2023",
    "2023-05-19",
    {
        abstractGameState : "Preview",
        codedGameState : "1",
        detailedState : "Scheduled",
        statusCode : "1",
        startTimeTBD : false
    },
    {
      away: {
        leagueRecord: { 
            wins: 8, 
            losses: 5,
            type: "league"
        },
        score: 2,
        team: { 
            id : 25,
            name : "Dallas Stars",
            link : "/api/v1/teams/25" 
        }
      },
      home: {
        leagueRecord : {
            wins : 8,
            losses : 3,
            type : "league"
          },
          score : 0,
          team : {
            id : 54,
            name : "Vegas Golden Knights",
            link : "/api/v1/teams/54"
          }
      }
    },
    { id: 5178, name: "T-Mobile Arena", link: "/api/v1/venues/5178" },
    { link: "/api/v1/game/2022030321/content" }
  );

  const liveGame = new Game(
    123456,
    "game-link",
    "regular",
    "2023",
    "2023-05-19",
    {
        abstractGameState : "Live",
        codedGameState : "1",
        detailedState : "Scheduled",
        statusCode : "1",
        startTimeTBD : false
    },
    {
      away: {
        leagueRecord: { 
            wins: 8, 
            losses: 5,
            type: "league"
        },
        score: 2,
        team: { 
            id : 25,
            name : "Dallas Stars",
            link : "/api/v1/teams/25" 
        }
      },
      home: {
        leagueRecord : {
            wins : 8,
            losses : 3,
            type : "league"
          },
          score : 0,
          team : {
            id : 54,
            name : "Vegas Golden Knights",
            link : "/api/v1/teams/54"
          }
      }
    },
    { id: 5178, name: "T-Mobile Arena", link: "/api/v1/venues/5178" },
    { link: "/api/v1/game/2022030321/content" }
  );

  

test('Ensure that game is not active', () => {
    expect(game.isGameLive).toBeFalsy;
});

test('Ensure that the game is active', () => {
    expect(liveGame.isGameLive).toBeTruthy;
});