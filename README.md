<!--
title: 'NHL Data Pipeline'
description: 'This project is an ingestion pipeline of data from the NHL. This utilizes the serverless framework
and AWS to parse game data into stored, accessible data. The AWS services that are used are CloudFormation, 
Lambda, SQS, RDS, and EventBridge.'
layout: Doc
framework: v3
platform: AWS
language: nodeJS
priority: 1
authorLink: 'https://github.com/Eli017'
authorName: 'Eli Sokeland'
authorAvatar: 'https://github.com/account'
-->


# NHL Data Pipeline

This project is an ingestion pipeline of data from the NHL. This utilizes the serverless framework
and AWS to parse game data into stored, accessible data. The AWS services that are used are CloudFormation, 
Lambda, SQS, RDS, and EventBridge.

## Installation

### Dependencies

- Ensure that you have the latest NodeJS installed (version 18.16.0 as of publishing).
  - Here is the download link for NodeJS: https://nodejs.org/en/download.
- In order to deploy to AWS, please make sure you are signed into the AWS v2 CLI.
  - Here is a link to get started: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html.
- This project was built with the Yarn package manager, please ensure that this is installed.
  - Here is the installation link for Yarn: https://yarnpkg.com/getting-started/install.

Before usage, ensure that you have run `yarn` to install all dependencies before usage.

### Database

Serverless doesn't support table definitions out of the box. Luckily, there is script included
in this project that contains the necessary SQL to generate the tables and connections. To
execute this statement, please do the following.

1. Ensure that MySQL and MySQL Workbench are set up on your local machine.
2. Run through the deployment steps listed below to instantiate the RDS database.
3. Add the 'MySQL/Aurora' security group for your IP address to allow remote connections.
4. Connect to the RDS instance using the MySQL Workbench.
5. Under the 'Database' tab, click on 'Forward Engineer.'
6. Using the file included in this project, execute this script into the remotely connected database.

If everything went correctly, there should be a schema on the left Workbench panel with the newly added tables.

## Usage

### Deployment

In order to deploy the project, you need to run the following command:

```
$ yarn deploy
```

After running deploy, you should see output similar to:

```bash
Deploying nhl-data-pipeline to stage dev (us-east-1)

✔ Service deployed to stack nhl-data-pipeline-dev (112s)

functions:
  hello: nhl-data-pipeline-dev-hello (1.5 kB)
```

### Invocation

After successful deployment, you can invoke the deployed function by using the following command:

```bash
serverless invoke --function handleScheduleFeed
```

Which should result in response similar to the following:

```json
{
    "statusCode": 200,
    "body": "{\"message\":\"SQS Message sent!\"}"
}
```

### Local development

You can invoke your function locally by using the following command:

```bash
serverless invoke local --function hello
```

The response will be different, due to the project's dependency on AWS services:

```
Could not resolve "QUEUE_URL" environment variable: Unsupported environment variable format: {
  'Fn::Sub': 'https://sqs.${AWS::Region}.amazonaws.com/${AWS::AccountId}/schedule-to-game-logic-queue'
}
```

### Resources

#### Database

Here is the following database structure that this program is based off of.
Please note that this does not have all of the data that the URL sources contain.
This is meant to be a barebones application that filters out the information into its essentials.

![plot](./resources/database-structure.png)
