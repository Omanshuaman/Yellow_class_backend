const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(
      `MongoDB connected successfully: , ${conn.connection.host}`.yellow.bold
    );
  } catch (error) {
    console.log("MongoDB connection error: ", error.message);
    process.exit();
  }
};

module.exports = connectDB;
