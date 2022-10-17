import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda/trigger/api-gateway-proxy";
import { CharactersController } from "../controllers/characters";
import { DB } from "../db/db";

const controller = new CharactersController(new DB());

export const listCharacterEpisodesHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const { characterId } = event.pathParameters;
  const episodes = await controller.listCharacterEpisodes(characterId);
  return {
    statusCode: 200,
    body: JSON.stringify(episodes),
  };
};
