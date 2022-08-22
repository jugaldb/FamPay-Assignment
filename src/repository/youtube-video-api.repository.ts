import { connect } from "../config/db.config";
import { Videos, VideosInterface } from "../model/youtube-video-api.model";

export class YoutubeVideoAPIRepository {
  private db: any = {};
  private youtubeVideoAPIRepository: any;

  constructor() {
    this.db = connect();
    // For Development
    this.db.sequelize.sync({ force: false }).then(() => {
      console.log("Drop and re-sync db.");
    });
    this.youtubeVideoAPIRepository = this.db.sequelize.getRepository(Videos);
  }

  async getVideos() {
    try {
      const videos = await this.youtubeVideoAPIRepository.findAll();
      console.log("videos:::", videos);
      return videos;
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  async saveVideos(toBeSaved: VideosInterface[]) {
    try {
      await this.youtubeVideoAPIRepository.destroy({
        where: {},
        truncate: true,
      });
      const videos = await this.youtubeVideoAPIRepository.bulkCreate(toBeSaved);
      console.log("videos:::", videos);
      return videos;
    } catch (err) {
      console.log(err);
      return [];
    }
  }
}
