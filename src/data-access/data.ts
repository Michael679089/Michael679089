import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";

export async function getData() {
    const DBClient = new DynamoDBClient({
        region: "us-east-1",
        // Credentials picked up automatically from AWS_ROLE_ARN + AWS_WEB_IDENTITY_TOKEN_FILE
        // (GitHub Actions OIDC provides these)
    });

    const command = new QueryCommand({
        TableName: "project-list",
    });

    const response = await DBClient.send(command);
    return response;
};