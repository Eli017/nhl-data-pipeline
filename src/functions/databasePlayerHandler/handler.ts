import axios from 'axios';
import Game from '../../types/Game';
import Player from '../../types/Player';
	
const mysql = require('serverless-mysql')({
    config: {
        host: process.env.HOST,
        database: process.env.DATABASE,
        user: process.env.USER,
        password: process.env.PASSWORD,
    }
});

export const databaseTeam = async (event, context, callback) => {
    for (const record of event.Records) {
        const game = JSON.parse(record.body) as Game;
        try {

            const response = await axios.get(
                `https://statsapi.web.nhl.com${game.link}`
            );
  
            const players: Record<string, Player> = response.data.players;
        
            const playerArray: Player[] = Object.values(players);
  
            for (const player of playerArray) {
                const existingPlayer = await mysql.query(
                    'SELECT * FROM players WHERE player_pk = ?', [player.playerPK]
                );
                if (existingPlayer.length > 0) {
                    console.log(`Player with ID ${player.playerPK} already exists in the database.`);
                    continue;
                };
  
                const insertResult = await mysql.query(
                'INSERT INTO players SET ?', player
                );
                console.log(`Player with ID ${player.playerPK} inserted into the database.`);
            }

            mysql.end();

        } catch (error) {
            console.error(error);
        }
    };
};