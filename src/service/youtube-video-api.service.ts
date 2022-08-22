import { YoutubeVideoAPIRepository } from "../repository/youtube-video-api.repository";

export class YoutubeVideoAPIService {
  private youtubeVideoAPIRepository: YoutubeVideoAPIRepository;

  constructor() {
    this.youtubeVideoAPIRepository = new YoutubeVideoAPIRepository();
  }

  async getVideos() {
    return await this.youtubeVideoAPIRepository.getVideos();
  }
  async saveVideos() {
    return await this.youtubeVideoAPIRepository.saveVideos();
  }
}
