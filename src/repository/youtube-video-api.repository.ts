import { connect } from "../config/db.config";
import { videos, VideosInterface } from "../model/youtube-video-api.model";

export class YoutubeVideoAPIRepository {
  private db: any = {};
  private youtubeVideoAPIRepository: any;
  private sequelize: any;

  constructor() {
    this.db = connect();
    // For Development
    this.db.sequelize.sync({ force: false }).then(() => {
      console.log("Drop and re-sync db.");
    });
    this.youtubeVideoAPIRepository = this.db.sequelize.getRepository(videos);
    this.sequelize = this.db.sequelize;
  }

  async getVideos() {
    try {
      const videos = await this.youtubeVideoAPIRepository.findAll({
        attributes: { exclude: ["search_doc_weights"] },
        order: [["published_at", "DESC"]],
      });
      return videos;
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  async saveVideos(toBeSaved: VideosInterface[], num: number) {
    try {
      if (num == 0) {
        await this.youtubeVideoAPIRepository.destroy({
          where: {},
          truncate: true,
        });
      }
      const videos = await this.youtubeVideoAPIRepository.bulkCreate(toBeSaved);
      this.sequelize.query(
        "update videos " +
          "set search_doc_weights = setweight(to_tsvector(name), 'A') || setweight(to_tsvector(coalesce(description, '')), 'B'); " +
          "drop index if exists search__weights_idx; " +
          "create index search__weights_idx on videos using GIN(search_doc_weights);"
      );
      return videos;
    } catch (err) {
      console.log(err);
      return [];
    }
  }
}
