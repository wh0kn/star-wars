import { connect, model, Schema } from "mongoose";
import { Character, Episode, DataSource, Planet } from "./models";
import { SecretsManager } from "aws-sdk";

export const Episodes = model<Episode>(
  "Episode",
  new Schema<Episode>({
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    year: Number,
  })
);

export const Planets = model<Planet>(
  "Planet",
  new Schema<Planet>({
    name: { type: String, required: true, unique: true },
  })
);

export const Characters = model<Character>(
  "Character",
  new Schema<Character>({
    name: { type: String, required: true, unique: true },
    episodes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Episode",
      },
    ],
    planet: {
      type: Schema.Types.ObjectId,
      ref: "Planet",
    },
  })
);

export class DB implements DataSource {
  constructor() {
    const secretsmanager = new SecretsManager({ apiVersion: "2017-10-17" });
    secretsmanager.getSecretValue(
      { SecretId: process.env.DB_SECRET_NAME },
      (err, data) => {
        console.log({ err, data });
        const { username, password, host, port } = JSON.parse(
          data.SecretString
        );
        connect(`mongodb://${username}:${password}@${host}:${port}`);
      }
    );
  }

  async countCharacters() {
    return await Characters.count().exec();
  }

  async getCharacters(offset: number, limit: number) {
    return await Characters.find({})
      .skip(offset)
      .limit(limit)
      .populate("planet")
      .populate("episodes")
      .lean()
      .exec();
  }

  async createCharacter(character: Character) {
    return await Characters.create(character);
  }

  async getCharacterById(characterId: string) {
    return await Characters.findOne({ _id: characterId })
      .populate("planet")
      .populate("episodes")
      .lean()
      .exec();
  }

  async countEpisodes() {
    return await Episodes.count().exec();
  }

  async getEpisodes(offset: number, limit: number) {
    return await Episodes.find({}).skip(offset).limit(limit).lean().exec();
  }

  async createEpisode(episode: Episode) {
    return await Episodes.create(episode);
  }

  async getEpisodeById(episodeId: string) {
    return await Episodes.findOne({ _id: episodeId }).lean().exec();
  }

  async getEpisodeBySlug(slug: string) {
    return await Episodes.findOne({ slug }).lean().exec();
  }

  async countPlanets() {
    return await Planets.count().exec();
  }

  async getPlanets(offset: number, limit: number) {
    return await Planets.find({}).skip(offset).limit(limit).lean().exec();
  }

  async createPlanet(planet: Planet) {
    return await Planets.create(planet);
  }

  async getPlanetById(planetId: string) {
    return await Planets.findOne({ _id: planetId }).lean().exec();
  }

  async getPlanetByName(name: string) {
    return await Planets.findOne({ name }).lean().exec();
  }

  async addCharacterToEpisode(characterId: string, episodeId: string) {
    await Characters.findByIdAndUpdate(
      characterId,
      { $push: { episodes: episodeId } },
      { new: true }
    );
  }

  async removeCharacterFromEpisode(characterId: string, episodeId: string) {
    await Characters.findByIdAndUpdate(
      characterId,
      { $pull: { episodes: episodeId } },
      { new: true }
    );
  }
}
