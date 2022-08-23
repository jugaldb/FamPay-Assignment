import cron from "node-cron";
import { getData } from "../utils/youtube_data";

cron.schedule("*/10 * * * * *", function () {
  getData("how to make tea");
});
