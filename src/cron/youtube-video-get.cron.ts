import cron from "node-cron";
import { getData } from "../utils/youtube_data";

cron.schedule("*/30 * * * * *", function () {
  getData("how to make tea");
});
