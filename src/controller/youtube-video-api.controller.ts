import { YoutubeVideoAPIService } from "../service/youtube-video-api.service";

export class YoutubeVideoAPIController {
  youtubeVideoAPIService: YoutubeVideoAPIService;
  constructor() {
    this.youtubeVideoAPIService = new YoutubeVideoAPIService();
  }

  async getVideos() {
    return await this.youtubeVideoAPIService.getVideos();
  }

  async saveVideos() {
    return await this.youtubeVideoAPIService.saveVideos();
  }
}
