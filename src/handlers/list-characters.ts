import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda/trigger/api-gateway-proxy";
import { CharactersController } from "../controllers/characters";
import { DB } from "../db/db";

const controller = new CharactersController(new DB());

export const listCharactersHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const { offset, limit } = event.queryStringParameters;
  const characters = await controller.listCharacters(+offset, +limit);
  return {
    statusCode: 200,
    body: JSON.stringify(characters),
  };
};
