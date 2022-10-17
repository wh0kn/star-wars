import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda/trigger/api-gateway-proxy";
import { EpisodesController } from "../controllers/episodes";
import { DB } from "../db/db";
import { JSONResponse } from "./common";

const controller = new EpisodesController(new DB());

export const retrieveEpisodeHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const { episodeId } = event.pathParameters;
  return JSONResponse(200, await controller.retrieveEpisode(episodeId));
};
