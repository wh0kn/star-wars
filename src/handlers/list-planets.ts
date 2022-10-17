import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda/trigger/api-gateway-proxy";
import { PlanetsController } from "../controllers/planets";
import { DB } from "../db/db";

const controller = new PlanetsController(new DB());

export const listPlanetsHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const { offset, limit } = event.queryStringParameters;
  const planets = await controller.listPlanets(+offset, +limit);
  return {
    statusCode: 200,
    body: JSON.stringify(planets),
  };
};
