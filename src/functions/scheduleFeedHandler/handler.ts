import axios, { AxiosResponse } from "axios";
import { APIGatewayProxyResult, EventBridgeEvent } from "aws-lambda";
import * as AWS from 'aws-sdk';
import ScheduleFeed from '../../types/ScheduleFeed';
import { EventBridgeDetailType, EventBridgeEventSource } from "aws-sdk/clients/pipes";

const sqs = new AWS.SQS();
const queueUrl = process.env.QUEUE_URL;

export const handleScheduleFeed = async (event: EventBridgeEvent<EventBridgeDetailType, EventBridgeEventSource>): Promise<APIGatewayProxyResult> => {

    await axios.get("https://statsapi.web.nhl.com/api/v1/schedule?teamId=30&startDate=2023-04-28&endDate=2023-05-01")
        .then(async (response: AxiosResponse) => {
            const scheduleFeed: ScheduleFeed = response.data;
            try {
                const params = {
                    MessageBody: JSON.stringify(scheduleFeed),
                    QueueUrl: queueUrl ?? ''
                };

                const result = await sqs.sendMessage(params).promise();
            } catch (error) {
                console.error('Failed to send message to SQS: ', error);
            }
        })
        .catch((error: any) => {
            console.error('Error: ', error);
        });

    const response: APIGatewayProxyResult = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Go Serverless v3.0! Your function executed successfully!',
            input: event,
        }),
    };

    return response;
};