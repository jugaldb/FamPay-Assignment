import * as bodyParser from "body-parser";
import express from "express";
import { YoutubeVideoAPIController } from "./controller/youtube-video-api.controller";
import * as fs from "fs";
import "dotenv/config";
import "./cron/youtube-video-get.cron";
import { numCron } from "./config/start.config";
class App {
  public express: express.Application;
  public youtubeVideoAPIController: YoutubeVideoAPIController;

  /* Swagger files start */

  /* Swagger files end */

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    this.youtubeVideoAPIController = new YoutubeVideoAPIController();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  private routes(): void {
    this.express.get("/api/video", (req, res) => {
      this.youtubeVideoAPIController.getVideos().then((data) => res.json(data));
    });

    this.express.get("/", (req, res, next) => {
      res.send("Typescript App works!!");
    });
    // handle undefined routes
    this.express.use("*", (req, res, next) => {
      res.send("Make sure url is correct!!!");
    });
  }
}

export default new App().express;
