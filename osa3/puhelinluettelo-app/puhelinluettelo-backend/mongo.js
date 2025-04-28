const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("Please provide password");
  process.exit(1);
}

const database = "phonebook";
const password = process.argv[2];
const mongoUri = `mongodb+srv://anton:${password}@cluster0.1cjv4z7.mongodb.net/${database}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set('strictQuery', false)
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
