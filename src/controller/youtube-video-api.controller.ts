import { YoutubeVideoAPIService } from "../service/youtube-video-api.service";

export class YoutubeVideoAPIController {
  youtubeVideoAPIService: YoutubeVideoAPIService;
  constructor() {
    this.youtubeVideoAPIService = new YoutubeVideoAPIService();
  }

  async getVideos() {
    return await this.youtubeVideoAPIService.getVideos();
  }

  async saveVideos(data: any, num: number) {
    return await this.youtubeVideoAPIService.saveVideos(data, num);
  }
}
