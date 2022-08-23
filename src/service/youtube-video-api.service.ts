import { YoutubeVideoAPIRepository } from "../repository/youtube-video-api.repository";
import { VideosInterface } from "../model/youtube-video-api.model";
export class YoutubeVideoAPIService {
  private youtubeVideoAPIRepository: YoutubeVideoAPIRepository;

  constructor() {
    this.youtubeVideoAPIRepository = new YoutubeVideoAPIRepository();
  }

  async getVideos(
    limit: number,
    offset: number,
    orderBy: string,
    orderType: string
  ) {
    return await this.youtubeVideoAPIRepository.getVideos(
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
    return await this.youtubeVideoAPIRepository.searchVideos(
      q,
      offset,
      orderBy,
      orderType
    );
  }

  async saveVideos(data: any, num: number) {
    let toBeSaved: VideosInterface[] = [];
    for (let d of data) {
      let obj: VideosInterface = {
        video_id: d.id.videoId,
        name: d.snippet.title,
        published_at: d.snippet.publishTime,
        thumbnail_url: d.snippet.thumbnails.default.url,
        channel_id: d.snippet.channelId,
        description: d.snippet.description,
        channel_name: d.snippet.channelTitle,
        created_date: new Date(),
      };
      toBeSaved.push(obj);
    }
    return await this.youtubeVideoAPIRepository.saveVideos(toBeSaved, num);
  }
}
