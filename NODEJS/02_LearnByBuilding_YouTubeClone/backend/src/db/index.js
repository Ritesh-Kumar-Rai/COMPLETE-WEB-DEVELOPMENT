import mongoose from "mongoose";

// Connection to MongoDB

const sleep = (sec) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, sec);
  });
};

async function connect_to_mongodb() {
  try {
    await sleep(5000);
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/`
    );
    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error(
      `Connection to MongoDB failed!\n${error.name} -> ${error.message}`
    );
    process.exit(1);
  }
}

export default connect_to_mongodb;
