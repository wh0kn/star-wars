import * as db from "../db/models";

interface DTO {
  _id?: string;
}

export interface EpisodeDTO extends DTO {
  slug: string;
  name: string;
  year?: number;
}

export interface PlanetDTO extends DTO {
  name: string;
}

export interface CharacterDTO extends DTO {
  name: string;
  episodes: Array<string>;
  planet?: string;
}

export interface CharacterDetailsDTO extends DTO {
  name: string;
  episodes: Array<EpisodeDTO>;
  planet?: PlanetDTO;
}

export interface PagedList<T> {
  offset: number;
  limit: number;
  count: number;
  items: Array<T>;
}

export const serializeCharacter = (character: db.Character): CharacterDTO => ({
  ...character,
  episodes: character.episodes.map((episode) => episode.slug),
  planet: character.planet?.name,
});

export const serializeEpisode = (episode: db.Episode): EpisodeDTO => ({
  _id: episode._id,
  name: episode.name,
  slug: episode.slug,
  year: episode.year,
});

export const serializePlanet = (planet: db.Planet): PlanetDTO => ({
  _id: planet._id,
  name: planet.name,
});

export const serializeCharacterDetails = (
  character: db.Character
): CharacterDetailsDTO => ({
  ...character,
  episodes: [
    ...new Map(
      character.episodes.map((ep) => [ep._id, serializeEpisode(ep)])
    ).values(),
  ],
  planet: character.planet ? serializePlanet(character.planet) : undefined,
});
