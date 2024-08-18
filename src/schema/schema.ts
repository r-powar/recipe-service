import { gql } from 'apollo-server-express';

const typeDefs = gql`
    type ListIngredient {
        name: String!
        quantity: Int!
        unit: String!
        purchased: Boolean
    }

    type ShoppingList {
        id: ID!
        ingredients: [ListIngredient!]!
    }

    input IngredientInput {
        name: String!
        quantity: Int!
        unit: String!
    }

    type Ingredient {
        name: String!
        quantity: Int!
        unit: String!
    }

    type Recipe {
        id: ID!
        name: String!
        description: String!
        ingredients: [Ingredient!]!
        instructions: [String!]!
        preparationTime: String!
        cookingTime: String!
        tags: [String!]!
        cuisineType: String!
        difficultyLevel: String!
    }

    type RecipeDetail {
        name: String!
        description: String!
        ingredients: [Ingredient]!
        instructions: [String!]!
        preparationTime: String!
        cookingTime: String!
    }

    input RecipeInput {
        name: String!
        description: String!
        ingredients: [IngredientInput!]!
        instructions: [String!]!
        preparationTime: String!
        cookingTime: String!
        tags: [String!]!
        cuisineType: String!
        difficultyLevel: String!
    }

    type User {
        id: ID!
        username: String!
        email: String!
        savedRecipes: [Recipe!]!
    }

    type Meal {
        day: String!
        mealType: String!
        recipeId: String!
    }

    input MealInput {
        day: String!
        mealType: String!
        recipeId: String!
    }

    type MealPlan {
        id: ID!
        userId: String!
        week: Int!
        year: Int!
        meals: [Meal!]!
    }

    input MealPlanInput {
        userId: String!
        week: Int!
        year: Int!
        meals: [MealInput!]!
    }

    input MarkIngredientAsPurchasedInput {
        userId: ID!
        week: Int!
        year: Int!
        itemName: String!
        purchased: Boolean!
    }

    input RecipeSearchInput {
        keyword: String
        tags: [String!]
        cuisineType: String
        difficultyLevel: String
    }

    type Query {
        getRecipes: [Recipe!]!
        getRecipe(id: ID!): RecipeDetail!
        searchRecipes(input: RecipeSearchInput!): [Recipe!]!
        getMealPlans(id: ID!): [MealPlan!]!
        generateShoppingList(userId: ID!, week: Int!, year: Int!): ShoppingList
    }

    type Mutation {
        createRecipe(input: RecipeInput!): Recipe!
        createUser(username: String!, email: String!): User!
        saveRecipe(userId: ID!, recipeId: ID!): User!
        createMealPlan(input: MealPlanInput!): MealPlan!
        markItemAsPurchased(input: MarkIngredientAsPurchasedInput!): ShoppingList!
    }
    
`;

export default typeDefs;
