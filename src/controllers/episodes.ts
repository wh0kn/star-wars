import { Body, Get, Path, Post, Query, Route } from "tsoa";
import { DataSource } from "../db/models";
import { EpisodeDTO, PagedList, serializeEpisode } from "./models";

@Route("episodes")
export class EpisodesController {
  constructor(private db: DataSource) {}

  @Get("/")
  async listEpisodes(
    @Query() offset: number,
    @Query() limit: number
  ): Promise<PagedList<EpisodeDTO>> {
    offset = offset || 0;
    limit = limit || 10;
    const count = await this.db.countEpisodes();
    const items = await this.db.getEpisodes(offset, limit);
    return {
      offset,
      limit,
      count,
      items: items.map(serializeEpisode),
    };
  }

  @Post("/")
  async createEpisode(@Body() episode: EpisodeDTO): Promise<EpisodeDTO> {
    return serializeEpisode(await this.db.createEpisode(episode));
  }

  @Get("{episodeId}")
  async retrieveEpisode(@Path() episodeId: string): Promise<EpisodeDTO> {
    return serializeEpisode(await this.db.getEpisodeById(episodeId));
  }
}
