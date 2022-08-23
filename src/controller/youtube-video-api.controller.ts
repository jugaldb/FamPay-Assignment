import { YoutubeVideoAPIService } from "../service/youtube-video-api.service";

export class YoutubeVideoAPIController {
  youtubeVideoAPIService: YoutubeVideoAPIService;
  constructor() {
    this.youtubeVideoAPIService = new YoutubeVideoAPIService();
  }

  async getVideos(limit: number, offset: number) {
    if (!limit) {
      limit = 10;
    }
    if (!offset) {
      offset = 0;
    }
    return await this.youtubeVideoAPIService.getVideos(limit, offset);
  }

  async searchVideos(q: string, offset: number) {
    if (q == null) {
      q = "";
    }
    q = q.toString();
    return await this.youtubeVideoAPIService.searchVideos(q, offset);
  }

  async saveVideos(data: any, num: number) {
    return await this.youtubeVideoAPIService.saveVideos(data, num);
  }
}
