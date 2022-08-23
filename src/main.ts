import * as bodyParser from "body-parser";
import express from "express";
import { YoutubeVideoAPIController } from "./controller/youtube-video-api.controller";
import * as fs from "fs";
import "dotenv/config";
import "./cron/youtube-video-get.cron";
import { numCron } from "./config/start.config";
import "./utils/maintain_API_keys";
import cors from "cors";

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
    this.express.use(cors());
    // Allow CORS
    // app.use((req, res, next) => {
    //   res.header("Access-Control-Allow-Origin", "*");
    //   res.header(
    //     "Access-Control-Allow-Headers",
    //     "Origin, X-Requested-With, Content-Type, Accept, Authorization,auth-token"
    //   );
    //   if (req.method === "OPTIONS") {
    //     res.header(
    //       "Access-Control-Allow-Methods",
    //       "PUT, POST, PATCH, DELETE, GET"
    //     );
    //     return res.status(200).json({});
    //   }
    //   next();
    // });
    this.express.get("/api/video", (req, res) => {
      console.log("revcieved");
      let limit = req.query.limit;
      let offset = req.query.offset;
      this.youtubeVideoAPIController
        .getVideos(Number(limit), Number(offset))
        .then((data) => res.json(data));
    });

    this.express.get("/api/search", (req, res) => {
      let offset = req.query.offset;
      let q = req.query.q;
      q = q!.toString();
      this.youtubeVideoAPIController
        .searchVideos(q, Number(offset))
        .then((data) => res.json(data));
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
