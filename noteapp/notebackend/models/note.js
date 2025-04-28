const mongoose = require("mongoose");

const mongoUri = process.env.MONGODB_URI;

console.log("connecting to", mongoUri);
mongoose
  .connect(mongoUri)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB: ", error.message);
  });

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

// delete _id and __v fields for serving an api
noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Note", noteSchema);
