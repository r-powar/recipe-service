import { RecipeInput, RecipeSearchInput } from '../types';
import RecipeService from '../services/recipeService';

const recipeResolvers = {
  Query: {
    getRecipes: async () => {
      try {
        return await RecipeService.getAllRecipes();
      } catch (error) {
        throw new Error((error as Error).message);
      }
    },
    getRecipe: async (_: any, { id }: { id: string }) => {
      try {
        return await RecipeService.getRecipeById(id);
      } catch (error) {
        throw new Error((error as Error).message);
      }
    },
    searchRecipes: async (_: any, { input }: { input: RecipeSearchInput }) => {
      try {
        return await RecipeService.searchRecipes(input);
      } catch (error) {
        throw new Error((error as Error).message);
      }
    },
  },
  Mutation: {
    createRecipe: async (_: any, { input }: { input: RecipeInput }) => {
      try {
        return await RecipeService.createRecipe(input);
      } catch (error) {
        throw new Error((error as Error).message);
      }
    },
  },
};

export default recipeResolvers;
