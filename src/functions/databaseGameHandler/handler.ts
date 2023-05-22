import * as AWS from 'aws-sdk';
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
            let results = await mysql.query('SELECT * FROM table');
            // Run clean up function
            await mysql.end();
        
            // Return the results
            return results;
        } catch (error) {
            console.error(error);
        }
    };
};