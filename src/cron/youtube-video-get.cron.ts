import cron from "node-cron";
import { getData } from "../utils/youtube_data";

cron.schedule("*/5 * * * * *", function () {
  getData("football");
});
