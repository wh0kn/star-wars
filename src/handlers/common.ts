import { APIGatewayProxyResult } from "aws-lambda";

export const JSONResponse = (
  status: number,
  body: unknown = {}
): APIGatewayProxyResult => ({
  statusCode: status,
  body: JSON.stringify(body),
});
