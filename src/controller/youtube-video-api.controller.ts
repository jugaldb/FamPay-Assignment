import { YoutubeVideoAPIService } from "../service/youtube-video-api.service";

export class YoutubeVideoAPIController {
  youtubeVideoAPIService: YoutubeVideoAPIService;
  constructor() {
    this.youtubeVideoAPIService = new YoutubeVideoAPIService();
  }

  async getVideos(
    limit: number,
    offset: number,
    orderBy: string,
    orderType: string
  ) {
    if (!limit) {
      limit = 10;
    }
    if (!offset) {
      offset = 0;
    }
    if (orderBy == "") {
      orderBy = "published_at";
      orderType = "DESC";
    } else {
      if (orderType == "a") {
        orderType = "ASC";
      } else {
        orderType = "DESC";
      }
    }
    return await this.youtubeVideoAPIService.getVideos(
      limit,
      offset,
      orderBy,
      orderType
    );
  }

  async searchVideos(
    q: string,
    offset: number,
    orderBy: string,
    orderType: string
  ) {
    if (q == null) {
      q = "";
    }
    q = q.toString();
    if (orderType.toLowerCase() == "a") {
      orderType = "ASC";
    } else {
      orderType = "DESC";
    }
    return await this.youtubeVideoAPIService.searchVideos(
      q,
      offset,
      orderBy,
      orderType
    );
  }

  async saveVideos(data: any, num: number) {
    return await this.youtubeVideoAPIService.saveVideos(data, num);
  }
}
