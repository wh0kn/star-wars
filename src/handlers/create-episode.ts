import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda/trigger/api-gateway-proxy";
import { EpisodesController } from "../controllers/episodes";
import { DB } from "../db/db";
import { JSONResponse } from "./common";
import { isEpisodeDTO } from "./validators";

const controller = new EpisodesController(new DB());

export const createEpisodeHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const episode = JSON.parse(event.body);
  if (!isEpisodeDTO(episode)) {
    return JSONResponse(400, { error: "Bad request" });
  }
  return JSONResponse(200, controller.createEpisode(episode));
};
