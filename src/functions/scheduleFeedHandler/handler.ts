import axios, { AxiosResponse } from "axios";
import { APIGatewayProxyResult, Callback, EventBridgeEvent } from "aws-lambda";
import ScheduleFeed from '../../../types/ScheduleFeed';
import { EventBridgeDetailType, EventBridgeEventSource } from "aws-sdk/clients/pipes";

export const handleScheduleFeed = async (event: EventBridgeEvent<EventBridgeDetailType, EventBridgeEventSource>): Promise<APIGatewayProxyResult> => {

    await axios.get("https://statsapi.web.nhl.com/api/v1/schedule?teamId=30&startDate=2023-04-28&endDate=2023-05-01")
        .then((response: AxiosResponse) => {
            const scheduleFeed: ScheduleFeed = response.data;
            console.log(scheduleFeed.totalItems);
        })
        .catch((error: any) => {
            console.error('Error: ', error);
        })

    const response: APIGatewayProxyResult = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Go Serverless v3.0! Your function executed successfully!',
            input: event,
        }),
    };

    return response;
};