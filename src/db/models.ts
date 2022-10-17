export interface DataSource {
  countCharacters: () => Promise<number>;
  getCharacters: (offset: number, limit: number) => Promise<Array<Character>>;
  createCharacter: (character: Character) => Promise<Character>;
  getCharacterById: (characterId: string) => Promise<Character>;

  countEpisodes: () => Promise<number>;
  getEpisodes: (offset: number, limit: number) => Promise<Array<Episode>>;
  createEpisode: (episode: Episode) => Promise<Episode>;
  getEpisodeById: (episodeId: string) => Promise<Episode>;
  getEpisodeBySlug: (slug: string) => Promise<Episode>;

  countPlanets: () => Promise<number>;
  getPlanets: (offset: number, limit: number) => Promise<Array<Planet>>;
  createPlanet: (planet: Planet) => Promise<Planet>;
  getPlanetById: (planetId: string) => Promise<Planet>;
  getPlanetByName: (name: string) => Promise<Planet>;

  addCharacterToEpisode: (
    characterId: string,
    episodeId: string
  ) => Promise<void>;
  removeCharacterFromEpisode: (
    characterId: string,
    episodeId: string
  ) => Promise<void>;
}

interface Entity {
  _id?: string;
}

export interface Episode extends Entity {
  slug: string;
  name: string;
  year?: number;
}

export interface Planet extends Entity {
  name: string;
}

export interface Character extends Entity {
  name: string;
  planet?: Planet;
  episodes: Array<Episode>;
}
