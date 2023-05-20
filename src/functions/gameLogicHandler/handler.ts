import * as AWS from 'aws-sdk';
import ScheduleFeed from '../../types/ScheduleFeed';
import { APIGatewayProxyResult } from 'aws-lambda';
import Game from '../../types/Game';

const sqs = new AWS.SQS();
const queueUrl = process.env.QUEUE_URL;

export const gameLogic = async (event, context, callback): Promise<APIGatewayProxyResult> => {
    for (const record of event.Records) {
        const schedule = JSON.parse(record.body) as ScheduleFeed;
        if (schedule.dates && schedule.dates.length > 0) {
            for (const game of schedule.dates[0].games) {

                const currentGame = new Game(
                    game.gamePk,
                    game.link,
                    game.gameType,
                    game.season,
                    game.gameDate,
                    game.status,
                    game.teams,
                    game.venue,
                    game.content
                );

                if (currentGame.isGameLive()) {
                    try {
                        
                        const params = {
                            MessageBody: JSON.stringify(currentGame),
                            QueueUrl: queueUrl ?? ''
                        };

                        await sqs.sendMessage(params).promise();
                    } catch (error) {
                        console.error('Failed to send message to SQS: ', error);
                        const response: APIGatewayProxyResult = {
                            statusCode: 500,
                            body: JSON.stringify({
                            message: 'Failed to send message',
                        }),
                        };
                        return response;
                    }
                }
            }
        }

        // Delete the processed message from the SQS queue
        await sqs.deleteMessage({
            QueueUrl: record.eventSourceARN,
            ReceiptHandle: record.receiptHandle
        }).promise();
    };

    const response: APIGatewayProxyResult = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'SQS Messages sent!',
        }),
    };
    return response;
};