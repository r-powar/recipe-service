# Recipe Service

Recipe service is a simple Node service using Typescript and GraphQL (Apollo) that should be used as a template for this code challenge.

## Prerequisites

Before you begin, ensure you can run this template with Docker.

### Installing Docker

To install Docker, follow these steps:

- Go to the Docker website at https://www.docker.com/products/docker-desktop.
- Download the appropriate installer for your operating system and run the installer.
- Follow the installation wizard to complete the installation.
- After the installation is complete, open a terminal or command prompt and run the following command to verify that Docker is installed correctly:

```
$ docker --version
```

If Docker is installed correctly, the command should output the version of Docker that you installed.

### Running Docker Compose

To run the Docker Compose, follow these steps:

- Clone this repository to your local machine.
- Navigate to the root directory of the cloned repository.
- Start the Docker containers by running the following command:

```
$ docker-compose up
```

This will start the Node.js server and MongoDB database. Access the Node.js application by opening a web browser and navigating to http://localhost:4001/graphql.

To stop the containers, open a new terminal or command prompt window and navigate to the root directory of the cloned repository.

Run the following command:
```
$ docker-compose down
```
This will stop and remove the containers, as well as any networks and volumes associated with them.


## Code Challenge

### Background

Your company is building a recipe sharing platform where users can create, search, and save recipes. The platform will also have a feature for meal planning, where users can create meal plans for the week and generate a shopping list based on their plan. As part of the project, you have been tasked with building the microservice to support that application using Mongodb, Nodejs (typescript), and Graphql.

### Business Requirements

The recipe sharing platform would have a homepage that displays featured recipes and allows users to search for recipes by keywords, tags, cuisine type, or difficulty level. When a user clicks on a recipe, they would be taken to a recipe detail page that shows the recipe name, description, ingredients, instructions, and other details such as preparation time and cooking time. The recipe detail page might also have buttons to save the recipe, add it to a meal plan, or generate a shopping list based on the recipe ingredients.

The meal planning feature would allow users to create meal plans for the week by selecting recipes from the platform's recipe library. Users would be able to specify the day of the week and the meal type (breakfast, lunch, or dinner) for each meal item in the plan. Once a meal plan is created, the user could view it on a calendar or a list view and make adjustments as needed.

The shopping list feature would allow users to generate a shopping list based on the ingredients needed for their meal plans. The shopping list would show the ingredient name, quantity, and unit of measurement, and the user could mark off items as they are purchased.

### Task

Your task is to implement a NodeJs microservice using typescript and MongoDb that provides GraphQL endpoints for the given business requirements. Add to this README file an explanation of how the endpoints should be used in the features described above, as well as the design patterns and the data modeling used in the implementation.

Good luck!

--------------------------------------------------------

### Documentation 

**Introduction**
This project is a microservice for recipe application, where users can search can create, search, save recipes and add them to meal plans. In addition it provide a capability to generate shopping list and mark off ingredients as purchased.


**Notes**
Some notes and assumptions made

1. I had to tweak with the docker file and docker-compose file. I was having some issues originally with booting the application, but upon some troubleshooting it was down to my personal machine. 

2. I assumed the application will have already have an authentication mechanism. But to closely simulate a user profile, I created a barebones user model that will be used to integrate with the application. 

3. Make sure to create a user before testing out the other queries (more on this below)


**Installation**

1. Install all the dependencies

```
npm i
```

2. You will need to use `migrate-mongo` to run the migration file defined under migrations/ folder, make sure you have a mongo server running
```
npx migrate-mongo up
```
The above command should create all the collections in the DB, it makes use of `migrate-mongo-config.ts` defined in the root of our application

3. To start the server locally
```
npm run development
```
The server should run on https://localhost:4001/graphql

I was running into a lot issues running the application server via Docker. In order to avoid spending a lot of my time debugging this, I decided to develop application by running locally.

I used Node version 16 to run my application locally.

You can still start the mongo server via Docker. 


**Features**

- User Management: Allows to create users and save receipes for a particular user
- Recipe Management: Allows to search recipes, create recipes get all recipes & get specific recipe detail 
- Meal Plan Management: Allow to get meal plan for specific user & create a meal plan for a user
- Shopping List Management: Allows to generate shopping list of ingredients based on a meal plan & allows to mark a specific ingredient as purchased


### Endpoints

**Users**

Create User

Mutation: `createUser`

```
mutation {
  createUser(username: "john_doe", email: "john@example.com") {
    id
    username
    email
  }
}
```

Save Recipe

Mutation: `saveRecipe`

```
mutation{
    saveRecipe(userId:"66a25ae513c85958c34be509", recipeId: "66a29a0731691c09682727d8" ){
        id
        username
        email
        savedRecipes
    }
}
```


**Recipes**

Get Recipe Details

Query: `getRecipe`

```
query{
  getRecipe(id:"66a29caceaf9490b02a80636"){
    name
    description
    ingredients {
      name
      quantity
      unit
    }
    instructions
    preparationTime
    cookingTime
  }
}
```

Get All Recipes

Query: `getRecipes`

```
query{
  getRecipes{
    id
    name
    description
    ingredients {
      name
      quantity
      unit
    }
    instructions
    preparationTime
    cookingTime
    tags
    cuisineType
    difficultyLevel
  }
}
```

Create Recipe

Mutation: `createRecipe`

```
mutation {
  createRecipe(input: {
    name: "Chocolate Chip Cookies",
    description: "Delicious homemade chocolate chip cookies.",
    ingredients: [
      { name: "Flour", quantity: "2", unit: "cups" },
      { name: "Sugar", quantity: "1", unit: "cup" },
      { name: "Butter", quantity: "1", unit: "cup" },
      { name: "Chocolate Chips", quantity: "1", unit: "cup" }
    ],
    instructions: [
      "Preheat the oven to 350°F (175°C).",
      "In a bowl, mix flour and sugar.",
      "Add butter and mix until smooth.",
      "Stir in chocolate chips.",
      "Drop by rounded spoonfuls onto ungreased baking sheets.",
      "Bake for 10 to 12 minutes, or until edges are golden brown."
    ],
    preparationTime: 15,
    cookingTime: 12,
    tags: ["dessert", "cookies"],
    cuisineType: "American",
    difficultyLevel: "Easy",
  }) {
    id
    name
  }
}
```

Search Recipe

Query: `searchRecipes`

```
query {
  searchRecipes(input: {
     keyword: "Chocolate",
     tags: ["dessert"],
     difficultyLevel: "Easy"
  }) {
    id
    name
    description
    ingredients {
      name
      quantity
      unit
    }
    instructions
    preparationTime
    cookingTime
    tags
    cuisineType
    difficultyLevel
  }
}
```

**Meal Plan**

Create Meal Plan

Mutation: `createMealPlan`

```
mutation {
  createMealPlan(input: {
    userId: "66a25ae513c85958c34be509",
    week: 30,
    year: 2024,
    meals: [
      { day: "Monday", mealType: "Breakfast", recipeId: "66a29caceaf9490b02a80636" },
      { day: "Tuesday", mealType: "Lunch", recipeId: "66a29a0731691c09682727d8" }
    ]
  }) {
    id
    userId
    week
    year
  }
}
```

Get Meal Plans

Query: `getMealPlans`

```
query {
  getMealPlans(userId: "66a25ae513c85958c34be509") {
    id
    week
    year
    meals {
      day
      mealType
      recipeId {
        id
        name
      }
    }
  }
}
```

**Shopping List**

Generate Shopping List

Query: `generateShoppingList`

```
query{
  generateShoppingList(userId:"66a25ae513c85958c34be509", week: 30, year: 2024){
    id
    ingredients {
      name
      quantity
      unit
      purchased
    }
  }
}
```

Mark Ingredient Purchased

Query: `markItemAsPurchased`

```
mutation{
  markItemAsPurchased(input:{ userId: "66a25ae513c85958c34be509", week: 30, year: 2024, itemName: "Tomato Sauce", purchased: true }){
    id    
    ingredients {
      name
      quantity
      unit
      purchased
    }
  }
}
```


### Desing Pattern

There are three pattern that are applicable in the application "Service Pattern", "Repository Pattern" & "Modular Structure"

I used the service pattern to encapsulate the business logic and interact with the database. Each feature in the application has its own service to handle logic. Thus ensuring easier maintainance and testing capabilites.

In addition, we use repository pattern for data access. Each service interacts with the database through repository function, which provides a cleaner interface for the services.

Overall the application is set up in a modular structure, separating concerns between different modules. Thus organizing the codebase to be more manageable and scalable.

### Data Modeling

**User**

The User model matains the fields `username`, `email` and `savedRecipes`. It allows to represent the users metadata information and any recipes they have saved.

**Recipe**

The Recipe model includes fields for recipe `name`, `description`, list for ingredients which allows to store (`recipeName`, `quantity` and `unit`), a list for `instructions`, `prepartionTime`, `cookingTime`, `tags` for recipe, `cuisineType` and `difficultyLevel`

**MealPlan**

The MealPlan model includes fields for `userId`, `week`, `year` and array of `meals`. Each meal data type inlcudes (`day` of the week , `mealType` and reference to `recipeId`)

**Shopping List**

The Shopping List model includes fields for `userID`, `week` number, `year` and array of `ingredients`. Each ingredient includes (`name`, `quantity`, `unit` & `purchased` flag to track the ingredient)


### Improvements

Due to time constraints on my end, I wasn't able to incorperate certain implemenations. But here is a list of items that I would iterate on

1. Unit Test and Integration Test
- Increase the test coverage by writing unit test for core features within the application using Jest.
- Implement end to end tests to ensure the entire workflow works as expected.

2. Error Handling
- Improve error handling by generating specific response type for errors, that would include the appropraite status code and descriptive message.

3. Improve Query Response
- Improve the response for successfull operations, define a generic succesful response that would include statusCode, message and if applicable a data property to return back the resource data.

4. Logging
- Integrate with logging libraries (like winston) for better debugging and error tracking purposes.

5. Pagination and Filtering
- Certain queries within the application (like search) could use pagination techniques to handle large data sets.
- Provide filtering options to narrow down results on mulitple criterias.

6. Validation and Sanitization
- Use existing libraries like joi to validate and sanitize input data.
- Validate and sanitize GraphQL inputs to prevent injection attacks and ensure data integrity.