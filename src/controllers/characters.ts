import { Body, Delete, Get, Path, Post, Put, Query, Route } from "tsoa";
import { DataSource } from "../db/models";
import {
  CharacterDetailsDTO,
  CharacterDTO,
  EpisodeDTO,
  PagedList,
  serializeCharacter,
  serializeCharacterDetails,
} from "./models";

@Route("characters")
export class CharactersController {
  constructor(private db: DataSource) {}

  @Get("/")
  async listCharacters(
    @Query() offset: number,
    @Query() limit: number
  ): Promise<PagedList<CharacterDTO>> {
    offset = offset || 0;
    limit = limit || 10;
    const count = await this.db.countCharacters();
    const items = await this.db.getCharacters(offset, limit);
    return {
      offset,
      limit,
      count,
      items: items.map(serializeCharacter),
    };
  }

  @Post("/")
  async createCharacter(
    @Body() character: CharacterDTO
  ): Promise<CharacterDTO> {
    return serializeCharacter(
      await this.db.createCharacter({
        ...character,
        episodes: await Promise.all(
          character.episodes.map((slug) => this.db.getEpisodeBySlug(slug))
        ),
        planet: character.planet
          ? await this.db.getPlanetByName(character.planet)
          : undefined,
      })
    );
  }

  @Get("{characterId}")
  async retrieveCharacter(
    @Path() characterId: string
  ): Promise<CharacterDetailsDTO> {
    return serializeCharacterDetails(
      await this.db.getCharacterById(characterId)
    );
  }

  @Get("{characterId}/episodes")
  async listCharacterEpisodes(
    @Path() characterId: string
  ): Promise<Array<EpisodeDTO>> {
    return serializeCharacterDetails(
      await this.db.getCharacterById(characterId)
    ).episodes;
  }

  @Put("{characterId}/episodes/{episodeId}")
  async addCharacterToEpisode(
    @Path() characterId: string,
    @Path() episodeId: string
  ): Promise<void> {
    await this.db.addCharacterToEpisode(characterId, episodeId);
  }

  @Delete("{characterId}/episodes/{episodeId}")
  async removeCharacterFromEpisode(
    @Path() characterId: string,
    @Path() episodeId: string
  ): Promise<void> {
    await this.db.removeCharacterFromEpisode(characterId, episodeId);
  }
}
