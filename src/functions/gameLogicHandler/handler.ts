import * as AWS from 'aws-sdk';
import ScheduleFeed from '../../types/ScheduleFeed';

export const gameLogic = async (event, context, callback) => {
  try {
    for (const record of event.Records) {
      const link = JSON.parse(record.body) as ScheduleFeed;

      // TODO: Add your custom logic here to respond to the message

    //   // Delete the processed message from the SQS queue
    //   await sqs.deleteMessage({
    //     QueueUrl: record.eventSourceARN,
    //     ReceiptHandle: record.receiptHandle
    //   }).promise();
    //   console.log('Deleted message:', message);
    }
  } catch (error) {
  }
};