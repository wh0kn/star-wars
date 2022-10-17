import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda/trigger/api-gateway-proxy";
import { CharactersController } from "../controllers/characters";
import { DB } from "../db/db";
import { JSONResponse } from "./common";
import { isCharacterDTO } from "./validators";

const controller = new CharactersController(new DB());

export const createCharacterHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const character = JSON.parse(event.body);
  if (!isCharacterDTO(character)) {
    return JSONResponse(400, { error: "Bad request" });
  }
  return JSONResponse(200, controller.createCharacter(character));
};
