import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda/trigger/api-gateway-proxy";
import { PlanetsController } from "../controllers/planets";
import { DB } from "../db/db";
import { JSONResponse } from "./common";

const controller = new PlanetsController(new DB());

export const retrievePlanetHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const { planetId } = event.pathParameters;
  return JSONResponse(200, await controller.retrievePlanet(planetId));
};
