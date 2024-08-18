import recipeResolvers from './recipeResolver';
import userResolvers from './userResolvers';
import mealPlanResolvers from './mealPlanResolver';
import shoppingListResolver from './shoppingListResolver';

const resolvers = {
  Query: {
    ...recipeResolvers.Query,
    ...shoppingListResolver.Query,
    ...mealPlanResolvers.Query,
  },
  Mutation: {
    ...recipeResolvers.Mutation,
    ...userResolvers.Mutation,
    ...mealPlanResolvers.Mutation,
    ...shoppingListResolver.Mutation,
  },
};

export default resolvers;
