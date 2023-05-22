import * as AWS from 'aws-sdk';
import Game from '../../types/Game';
import { APIGatewayProxyResult } from 'aws-lambda';
	
const mysql = require('serverless-mysql')({
    config: {
      host     : 'nhl.cqvu4vue0d4v.us-east-1.rds.amazonaws.com',
      port     : 3306,
      database : 'NHL',
      user     : 'admin',
      password : 'password'
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