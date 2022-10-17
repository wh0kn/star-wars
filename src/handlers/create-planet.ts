import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda/trigger/api-gateway-proxy";
import { PlanetsController } from "../controllers/planets";
import { DB } from "../db/db";
import { JSONResponse } from "./common";
import { isPlanetDTO } from "./validators";

const controller = new PlanetsController(new DB());

export const createPlanetHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const planet = JSON.parse(event.body);
  if (!isPlanetDTO(planet)) {
    return JSONResponse(400, { error: "Bad request" });
  }
  return JSONResponse(200, controller.createPlanet(planet));
};
