import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda/trigger/api-gateway-proxy";
import { CharactersController } from "../controllers/characters";
import { DB } from "../db/db";
import { JSONResponse } from "./common";

const controller = new CharactersController(new DB());

export const retrieveCharacterHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const { characterId } = event.pathParameters;
  return JSONResponse(200, await controller.retrieveCharacter(characterId));
};
