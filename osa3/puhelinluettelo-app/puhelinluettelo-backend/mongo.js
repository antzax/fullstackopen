require('dotenv').config()
const mongoose = require("mongoose");

if (process.argv.length < 3){
  console.log("Did you forget password?")
  process.exit(1)
}

const dbPass = process.argv[2]
const mongoUri=`mongodb+srv://antonv1997:${dbPass}@cluster0.uc49hom.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(mongoUri);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
  Person.find({}).then((persons) => {
    persons.forEach((person) => {
      console.log(person);
    });

    mongoose.connection.close();
    return;
  });
}

if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });

  person.save().then((response) => {
    console.log("Person saved");
    console.log(response);
    mongoose.connection.close();
  });
}
