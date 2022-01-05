import mongoose from "mongoose";
async function dbConnect() {
  mongoose
    .connect(process.env.MONGO_DB)
    .then((mongoose) => {
      return mongoose;
    })
    .catch((err) => {
      throw "BŁĄD POŁĄCZENIA Z BAZĄ";
    });
}
export default dbConnect;
