import * as bodyParser from "body-parser";
import express from "express";
import { YoutubeVideoAPIController } from "./controller/youtube-video-api.controller";
import * as fs from "fs";
import "dotenv/config";
import { numCron } from "./config/start.config";
import { cronJob } from "./cron/youtube-video-get.cron";
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
      try {
        console.log("revcieved");
        let limit = req.query.limit;
        let offset = req.query.offset;
        let orderBy = req.query.orderBy!;
        let orderType = req.query.orderType!;
        if (!orderBy) {
          orderBy = "";
          orderType = "";
        }
        this.youtubeVideoAPIController
          .getVideos(
            Number(limit),
            Number(offset),
            orderBy.toString(),
            orderType.toString()
          )
          .then((data) => res.json(data));
      } catch (e: any) {
        res.status(500).json({
          error: e.toString(),
        });
      }
    });

    this.express.get("/api/search", (req, res) => {
      try {
        let offset = req.query.offset;
        let q = req.query.q;
        let orderBy = req.query.orderBy!;
        let orderType = req.query.orderType!;
        if (!orderBy) {
          orderBy = "";
          orderType = "";
        }
        q = q!.toString();
        this.youtubeVideoAPIController
          .searchVideos(
            q,
            Number(offset),
            orderBy.toString(),
            orderType.toString()
          )
          .then((data) => res.json(data));
      } catch (e: any) {
        res.status(500).json({
          error: e.toString(),
        });
      }
    });
    this.express.get("/startCron", (req, res) => {
      try {
        cronJob.start();
        res.send("Cron started");
      } catch (e: any) {
        res.status(500).json({
          error: e.toString(),
        });
      }
    });
    this.express.get("/stopCron", (req, res) => {
      try {
        cronJob.stop();
        res.send("Cron stopped");
      } catch (e: any) {
        res.status(500).json({
          error: e.toString(),
        });
      }
    });
    this.express.get("/", (req, res, next) => {
      res.status(200).json({
        message:
          "Hi Recruiters, I am Jugal, and this is my submission for the FamPay - backend engineer role.",
        important_links: {
          github_repo: {
            backend_repo: "https://github.com/jugaldb/FamPay-Assignment",
            frontend_repo:
              "https://github.com/jugaldb/fampay-assignment-frontend",
          },
          hosted_api: "https://fampay-task-api.jugaldb.com",
          frontend: "https://fampay-task.jugaldb.com",
          postman_docs:
            "https://documenter.getpostman.com/view/10968840/VUqrPd4s",
          youtube_video: "https://youtu.be/FBF0OYFLLTo",
        },
      });
    });
    // handle undefined routes
    this.express.use("*", (req, res, next) => {
      res.send("Make sure url is correct!!!");
    });
  }
}

export default new App().express;
