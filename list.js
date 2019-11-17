import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context)
{
	const params = {
		TableName: process.env.tableName,
		// 'Key' defines the partition key and sort key of the item to be retrieved
		// - 'userId': Identity Pool identity id of the authenticated user
		// - 'noteId': path parameter
		KeyConditionExpression: "userId = :userId",
		ExpressionAttributeValues: {
			":userId": event.requestContext.identity.cognitoIdentityId
		}
	};

        try{
		const result = await dynamoDbLib.call("query",params);
		if (result.Items){
			return success(result.Items);
		}else
		{
			return failure({ status: false, error: "Items not found." });
		}
	}catch(e){
		console.log(e);
		return failure({ status:false });
	}
}

