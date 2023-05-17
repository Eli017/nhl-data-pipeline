import axios, { AxiosResponse } from "axios";
import ScheduleFeed from './types/ScheduleFeed';

// modern module syntax
export async function hello(event, context, callback) {

    await axios.get("https://statsapi.web.nhl.com/api/v1/schedule?teamId=30&startDate=2023-04-28&endDate=2023-05-01")
        .then((response: AxiosResponse) => {
            const scheduleFeed: ScheduleFeed = response.data;
            console.log(scheduleFeed.totalItems);
        })
        .catch((error: any) => {
            console.error('Error: ', error);
        })

    const response = {
    statusCode: 200,
    body: JSON.stringify({
        message: 'Go Serverless v3.0! Your function executed successfully!',
        input: event,
    }),
    };

    callback(null, response);
}