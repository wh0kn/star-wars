import { Body, Get, Path, Post, Query, Route } from "tsoa";
import { DataSource } from "../db/models";
import { PlanetDTO, PagedList, serializePlanet } from "./models";

@Route("planets")
export class PlanetsController {
  constructor(private db: DataSource) {}

  @Get("/")
  async listPlanets(
    @Query() offset: number,
    @Query() limit: number
  ): Promise<PagedList<PlanetDTO>> {
    offset = offset || 0;
    limit = limit || 10;
    const count = await this.db.countPlanets();
    const items = await this.db.getPlanets(offset, limit);
    return {
      offset,
      limit,
      count,
      items: items.map(serializePlanet),
    };
  }

  @Post("/")
  async createPlanet(@Body() planet: PlanetDTO): Promise<PlanetDTO> {
    return serializePlanet(await this.db.createPlanet(planet));
  }

  @Get("{planetId}")
  async retrievePlanet(@Path() planetId: string): Promise<PlanetDTO> {
    return serializePlanet(await this.db.getPlanetById(planetId));
  }
}
