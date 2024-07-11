const mongoose = require("mongoose");

async function connectToDb() {
  // await mongoose.connect("mongodb+srv://mb2060127:manish%40123@cluster0.2d8lnl2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  await mongoose.connect("mongodb://localhost:27017", {
    dbName: "blog-aces",
  });
  console.log("Database connected");
}

module.exports = connectToDb;

// module.exports=mongoose
// export default mongoose
// mongodb://localhost:27017
// mongodb+srv://mb2060127:manish%40123@cluster0.2d8lnl2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
