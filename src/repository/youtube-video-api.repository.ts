import { QueryTypes } from "sequelize";
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

  async getVideos(
    limit: number,
    offset: number,
    orderBy: string,
    orderType: string
  ) {
    try {
      let count = await this.youtubeVideoAPIRepository.count();
      let videos;
      if (orderBy == "published_at" && orderType == "DESC") {
        videos = await this.youtubeVideoAPIRepository.findAll({
          attributes: { exclude: ["search_doc_weights"] },
          order: [["published_at", "DESC"]],
          limit,
          offset,
        });
      } else {
        videos = await this.youtubeVideoAPIRepository.findAll({
          attributes: { exclude: ["search_doc_weights"] },
          order: [[orderBy, orderType]],
          limit,
          offset,
        });
      }

      return {
        videos: videos,
        pages: Math.ceil(count / 10),
      };
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  async searchVideos(
    q: string,
    offset: number,
    orderBy: string,
    orderType: string
  ) {
    try {
      let videos;
      if (orderBy != "") {
        videos = await this.sequelize.query(
          'SELECT * FROM videos WHERE search_doc_weights @@ plainto_tsquery(:query) order by "' +
            orderBy +
            '" ' +
            orderType +
            " LIMIT :limit OFFSET :offset",
          {
            replacements: {
              query: q,
              limit: 10,
              offset: offset,
              orderBy,
            },
            type: QueryTypes.SELECT,
          }
        );
      } else {
        console.log("here");
        videos = await this.sequelize.query(
          "SELECT * FROM videos WHERE search_doc_weights @@ plainto_tsquery(:query) order by ts_rank(search_doc_weights, plainto_tsquery(:query)) desc LIMIT :limit OFFSET :offset",
          {
            replacements: { query: q, limit: 10, offset: offset },
            type: QueryTypes.SELECT,
          }
        );
      }

      const count = await this.sequelize.query(
        "SELECT video_id FROM videos WHERE search_doc_weights @@ plainto_tsquery(:query) order by ts_rank(search_doc_weights, plainto_tsquery(:query)) desc",
        {
          replacements: { query: q },
          type: QueryTypes.SELECT,
        }
      );
      let pages = Math.ceil(count.length / 10);
      return { videos, pages };
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
      const videos = await this.youtubeVideoAPIRepository.bulkCreate(
        toBeSaved,
        {
          updateOnDuplicate: ["video_id"],
        }
      );
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
