import * as AWS from 'aws-sdk';
import ScheduleFeed from '../../types/ScheduleFeed';

const sqs = new AWS.SQS();

export const gameLogic = async (event, context, callback) => {
  try {
    for (const record of event.Records) {
        const schedule = JSON.parse(record.body) as ScheduleFeed;

        for (const game of schedule.dates[0].games) {
            if (game.status.abstractGameState === 'Live') {
            }
        }

        // Delete the processed message from the SQS queue
        await sqs.deleteMessage({
            QueueUrl: record.eventSourceARN,
            ReceiptHandle: record.receiptHandle
        }).promise();
    }
  } catch (error) {
  }
};