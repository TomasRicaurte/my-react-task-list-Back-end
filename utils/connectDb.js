const mongoose = require("mongoose");

async function connectDb(req, res, next) {
  try {
    await mongoose.connect(
      "mongodb+srv://TomasRicaurte:DataBases_mongoose@cluster0.gntjijy.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp",
      { dbName: "Elements" }
    );
    console.log("conexión exitosa 👌");
    next();
  } catch (error) {
    console.log("Error", error);
  }
}

module.exports = connectDb;
