import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda/trigger/api-gateway-proxy";
import { EpisodesController } from "../controllers/episodes";
import { DB } from "../db/db";

const controller = new EpisodesController(new DB());

export const listEpisodesHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const { offset, limit } = event.queryStringParameters;
  const episodes = await controller.listEpisodes(+offset, +limit);
  return {
    statusCode: 200,
    body: JSON.stringify(episodes),
  };
};
