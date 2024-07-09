const mongoose = require("mongoose"); //importing mongoose

async function connectToDb() {
  await mongoose.connect("mongodb://localhost:27017", {
    dbName: "blog-aces",
  });
  console.log("Connected to database");
}
module.exports = connectToDb;

// module.exports=mongoose
// export default mongoose
