import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda/trigger/api-gateway-proxy";
import { CharactersController } from "../controllers/characters";
import { DB } from "../db/db";
import { JSONResponse } from "./common";

const controller = new CharactersController(new DB());

export const removeCharacterFromEpisodeHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const { characterId, episodeId } = event.pathParameters;
  await controller.removeCharacterFromEpisode(characterId, episodeId);
  return JSONResponse(204);
};
