import mongoose from "mongoose";
import app from "./app";
import { Server } from "http";
import config from "./app/config";

const port = config.port;
let server: Server;
async function main() {
  try {
    await mongoose.connect(config.db_url as string);
    server = app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

// unhandledRejection
process.on("unhandledRejection", () => {
  console.log(`😗 unhandledRejection is detected, shutting down....`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log(`😗 uncaughtException is detected, shutting down....`);
  process.exit(1);
});
