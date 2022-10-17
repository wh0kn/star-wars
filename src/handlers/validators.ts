import TSON from "typescript-json";
import { CharacterDTO, EpisodeDTO, PlanetDTO } from "../controllers/models";

export const isCharacterDTO = (o: unknown): o is CharacterDTO =>
  TSON.is<CharacterDTO>(o);

export const isEpisodeDTO = (o: unknown): o is EpisodeDTO =>
  TSON.is<EpisodeDTO>(o);

export const isPlanetDTO = (o: unknown): o is PlanetDTO =>
  TSON.is<PlanetDTO>(o);
