import { google } from "googleapis";
var youtube = google.youtube({
  version: "v3",
  auth: process.env.GOOGLE_API_KEY,
});

export const getData = (query: string) => {
  youtube.search.list(
    {
      part: ["snippet"],
      q: query,
      publishedAfter: "2022-06-22T21:30:04.000Z",
      maxResults: 10,
    },
    function (err, data: any) {
      if (err) {
        console.error("Error: " + err);
      }
      if (data) {
        console.log(data);
        console.log(data.data.items);
      }
    }
  );
};
