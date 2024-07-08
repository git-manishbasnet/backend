const mongoose = require("mongoose"); //importing mongoose

async function connectToDb() {
  await mongoose.connect(
    "mongodb+srv://manish:manish123456@manish.mostu3z.mongodb.net/?retryWrites=true&w=majority&appName=Manish "
  );
  console.log("Connected to database");
}
module.exports = connectToDb;

// module.exports=mongoose
// export default mongoose
