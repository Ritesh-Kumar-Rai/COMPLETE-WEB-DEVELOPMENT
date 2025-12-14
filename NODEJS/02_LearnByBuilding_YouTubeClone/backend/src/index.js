import dotenv from "dotenv";
import connect_to_mongodb from "./db/index.js";
import express from "express";

dotenv.config({ path: "./.env" });

const app = express();

console.log("connecting to mongodb...");

connect_to_mongodb().then((e) => {
  app.listen(process.env.PORT, () => {
    console.log(
      `Server is started serving at http://localhost:${process.env.PORT}`
    );
  });
});
