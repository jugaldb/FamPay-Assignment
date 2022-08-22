import app from "./main";
var server = require("http").createServer(app);
const PORT = process.env.PORT || 3000;

server.listen(PORT);
console.log("Server listening on port: " + PORT);
