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

export const databaseTeam = async (event, context, callback) => {
    for (const record of event.Records) {
        const game = JSON.parse(record.body) as Game;
        try {

            // Store the home team information if it's missing from the database
            const [homeRows] = await mysql.query(`SELECT * FROM team WHERE team_pk=${game.teams.home.team.id}`);

            if (homeRows.length() == 0) {
                const homeTeam = game.teams.home.team;
                // TODO: Find out how current ranking scores are calculated
                await mysql.query(`
                INSERT INTO team VALUES (${homeTeam.id}, ${homeTeam.name}, 0)
                `);
            };

            // Store the away team information if it's missing from the database
            // Possible improvement: Have this in a separate lambda. Because this
            // is technically a separate role, this could be moved.
            const [awayRows] = await mysql.query(`SELECT * FROM team WHERE team_pk=${game.teams.away.team.id}`);

            if (awayRows.length() == 0) {
                const awayTeam = game.teams.away.team;
                // TODO: Find out how current ranking scores are calculated
                const result = await mysql.query(`
                INSERT INTO team VALUES (${awayTeam.id}, ${awayTeam.name}, 0)
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