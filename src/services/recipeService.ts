import { RecipeInput, RecipeSearchInput } from '../types';
import { NotFoundError, ValidationError } from '../errors';
import Recipe from '../models/recipe';

class RecipeService {
  async getAllRecipes() {
    try {
      const recipes = await Recipe.find();
      return recipes;
    } catch (err) {
      throw new NotFoundError('Error getting recipes');
    }
  }

  async getRecipeById(id: string) {
    try {
      const recipe = await Recipe.findById(id);
      if (!recipe) throw new NotFoundError('Recipe not found');
      return recipe;
    } catch (error) {
      throw new Error('Error getting the recipe');
    }
  }

  async createRecipe(input: RecipeInput) {
    try {
      // TO-DO: cover validation input in more detail
      if (!input.name || !input.ingredients || input.ingredients.length === 0) {
        throw new ValidationError('Name and ingredients are required');
      }
      const recipe = new Recipe(input);
      return await recipe.save();
    } catch (error) {
      throw new Error(String((error as Error).message));
    }
  }

  async searchRecipes(input: RecipeSearchInput) {
    try {
      const {
        keyword, tags, cuisineType, difficultyLevel,
      } = input;

      const orConditions = [];

      if (keyword) {
        orConditions.push(
          { name: new RegExp(keyword, 'i') },
          { description: new RegExp(keyword, 'i') },
          { 'ingredients.name': new RegExp(keyword, 'i') },
        );
      }

      if (cuisineType) {
        orConditions.push({ cuisineType });
      }

      if (tags && tags.length > 0) {
        orConditions.push({ tags: { $in: tags } });
      }

      if (difficultyLevel) {
        orConditions.push({ difficultyLevel });
      }

      const filter = orConditions.length > 0 ? { $or: orConditions } : {};

      const recipes = await Recipe.find(filter).exec();
      return recipes;
    } catch (error) {
      throw new Error('There was an issue searching your query...');
    }
  }
}

export default new RecipeService();
