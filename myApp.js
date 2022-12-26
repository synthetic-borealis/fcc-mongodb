require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env['MONGO_URI'], { useNewUrlParser: true, useUnifiedTopology: true });


const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFoods: [String],
});

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  let janeFonda = new Person({ name: "Jane Fonda", age: 84, favoriteFoods: ["eggs", "fish", "fresh fruit"] });

  janeFonda.save(function (err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

let arrayOfPeople = [
  { name: 'Frank', age: 68, favoriteFoods: ['pizza', 'hummus', 'hamburger'] },
  { name: 'Sarah', age: 27, favoriteFoods: ['rice', 'peach', 'eggs'] },
  { name: 'Robert', age: 42, favoriteFoods: ['wine'] },
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function (err, personFound) {
    if (err) return console.error(err);
    done(null, personFound)
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function (err, personFound) {
    if (err) return console.error(err);
    done(null, personFound)
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function (err, personFound) {
    if (err) return console.error(err);
    done(null, personFound)
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, function (err, person) {
    if (err) return console.error(err);

    person.favoriteFoods.push(foodToAdd);
    person.save(function (err, updatedPerson) {
      if (err) return console.error(err);
      done(null, updatedPerson)
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, function (err, updatedPerson) {
    if (err) return console.error(err);
    done(null, updatedPerson)
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(
    personId,
    (err, removedDoc) => {
      if (err) return console.log(err);
      done(null, removedDoc);
    }
  );
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({ name: nameToRemove }, (err, result) => {
    if (err) return console.log(err);
    done(null, result);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0 })
    .exec((err, data) => {
      if (err) return console.log(err);
      done(null, data);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
