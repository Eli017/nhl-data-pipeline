import Game from '../../types/Game';
import { APIGatewayProxyResult } from 'aws-lambda';
	
const mysql = require('serverless-mysql')({
    config: {
        host: process.env.HOST,
        database: process.env.DATABASE,
        user: process.env.USER,
        password: process.env.PASSWORD,
    }
});

export const databaseGame = async (event, context, callback) => {
    for (const record of event.Records) {
        const game = JSON.parse(record.body) as Game;
        try {
            const [rows] = await mysql.query(`SELECT * FROM game WHERE game_pk=${game.gamePk}`);

            if (rows.length() == 0) {
                // TODO: Find out how penalty minutes are kept in liveData
                const result = await mysql.query(`
                INSERT INTO game VALUES (${game.gamePk}, ${game.teams.home.team.id}, 
                    ${game.teams.away.team.id}, 0)
                `);

                // Run clean up function
                await mysql.end();
            
                // Return the results
                return result;
            };

            await mysql.end();

            const response: APIGatewayProxyResult = {
                statusCode: 200,
                body: JSON.stringify({
                    message: 'Game already exists!',
                }),
            };
            return response;
        } catch (error) {
            console.error(error);
        }
    };
};