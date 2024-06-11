const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })

  .then(() => {
    return Recipe.create({
      title: "Asian Glazed Chicken Thighs",
      level: "Amateur Chef",
      ingredients: [
        "1/2 cup rice vinegar",
        "5 tablespoons honey",
        "1/3 cup soy sauce (such as Silver Swan®)",
        "1/4 cup Asian (toasted) sesame oil",
        "3 tablespoons Asian chili garlic sauce",
        "3 tablespoons minced garlic",
        "salt to taste",
        "8 skinless, boneless chicken thighs"
      ],
      cuisine: "Asian",
      dishType: "main_course",
      image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      duration: 40,
      creator: "Chef LePapu"
    })
  }).then((recipe) => {
    console.log(recipe.title);
  })
  .then(() => {
    return Recipe.insertMany(data)
  })
  .then((result) => {
    result.forEach((recipe) => {
      console.log(recipe.title);
    });
  })

return Recipe.findOneAndUpdate(
  { title: 'Rigatoni alla Genovese' },  // filter
  { duration: 100 },                    // update
  { new: true }                         // options
)
  .then(updatedRecipe => {
    if (updatedRecipe) {
      console.log('Success! The duration of Rigatoni alla Genovese has been updated to 100.');
    } else {
      console.log('Recipe not found.');
    }

  return Recipe.deleteOne({ title: 'Carrot Cake' })
})
.then(deletionResult => {
  if (deletionResult.deletedCount > 0) {
    console.log('Success! The Carrot Cake recipe has been removed.');
  } else {
    console.log('Carrot Cake recipe not found.');
  }
})
  .catch(error => {
    console.error('Error:', error);
  })
  .catch((error) => {
    console.error("Error inserting recipes:", error);
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
  .finally(() => {
    mongoose.connection.close();
  })