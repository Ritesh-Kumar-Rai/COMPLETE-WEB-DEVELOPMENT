import dotenv from "dotenv";
import connect_to_mongodb from "./db/index.js";
import app from "./app.js";

dotenv.config({ path: "./.env" });

console.log("connecting to mongodb...");

connect_to_mongodb()
  .then((e) => {
    app.on("error", (err) => {
      console.log("Something went wrong!");
      throw err;
    });

    app.listen(process.env.PORT, () => {
      console.log(`Server is started serving at http://localhost:${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed while connecting to mongodb and starting a server!\n", error);
  });
