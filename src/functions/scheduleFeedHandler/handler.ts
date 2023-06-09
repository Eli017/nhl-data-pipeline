import axios, { AxiosResponse } from "axios";
import { APIGatewayProxyResult, EventBridgeEvent } from "aws-lambda";
import * as AWS from 'aws-sdk';
import ScheduleFeed from '../../types/ScheduleFeed';
import { EventBridgeDetailType, EventBridgeEventSource } from "aws-sdk/clients/pipes";

const sqs = new AWS.SQS();
const queueUrl = process.env.QUEUE_URL;

export const handleScheduleFeed = async (event: EventBridgeEvent<EventBridgeDetailType, EventBridgeEventSource>): Promise<APIGatewayProxyResult> => {

    const response = await axios.get("https://statsapi.web.nhl.com/api/v1/schedule")
        .then(async (response: AxiosResponse) => {
            const scheduleFeed: ScheduleFeed = response.data;
            try {
                const params = {
                    MessageBody: JSON.stringify(scheduleFeed),
                    QueueUrl: queueUrl ?? ''
                };

                await sqs.sendMessage(params).promise();
                const response: APIGatewayProxyResult = {
                    statusCode: 200,
                    body: JSON.stringify({
                        message: 'SQS Message sent!',
                    }),
                };
                return response;
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
        })
        .catch((error: any) => {
            console.error('Error: ', error);
            const response: APIGatewayProxyResult = {
                statusCode: 500,
                body: JSON.stringify({
                    message: 'Failed to send message',
                    input: event,
                }),
            };
            return response;
        });
        return response;
};