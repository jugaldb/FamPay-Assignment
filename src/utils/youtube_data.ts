import { google } from "googleapis";
import { YoutubeVideoAPIController } from "../controller/youtube-video-api.controller";
import { numCron as num } from "../config/start.config";
import { maintainAndGetKeys } from "./maintain_API_keys";
let number = num;
let youtubeNext: string;
var baseDate = new Date("May 14, 2022 12:00:00");
let key = process.env.DEFAULT_KEY;

const youtubeVideoAPIController = new YoutubeVideoAPIController();

export const getData = async (query: string) => {
  console.log(number);
  if (number == 0) {
    await callYoutubeDataAPIAndSaveData({
      part: ["snippet"],
      q: query,
      publishedAfter: baseDate.toISOString(),
      maxResults: 50,
    });
  } else {
    await callYoutubeDataAPIAndSaveData({
      part: ["snippet"],
      q: query,
      maxResults: 50,
      pageToken: youtubeNext,
    });
  }
};

const callYoutubeDataAPIAndSaveData = async (requestParams: any) => {
  key = maintainAndGetKeys(key);
  var youtube = google.youtube({
    version: "v3",
    auth: key,
  });
  youtube.search.list(requestParams, function (err: any, data: any) {
    if (err) {
      console.error("Error: " + err);
    }
    if (data) {
      console.log(data);
      // console.log(data.data.items.length);
      youtubeVideoAPIController.saveVideos(data.data.items, number);
      number++;
      youtubeNext = data.data.nextPageToken ? data.data.nextPageToken : "null";
      if (youtubeNext == "null") {
        number = 0;
      } // next page token
      // baseDate.setDate(baseDate.getDate() - 30); // base date subtract 30 days to get older videos
    }
  });
};
