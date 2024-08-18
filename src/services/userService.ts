import Recipe from '../models/recipe';
import User from '../models/users';
import { DatabaseError, ValidationError, NotFoundError } from '../errors';

class UserService {
  async createUser(username: string, email: string) {
    try {
      if (!username || !email) {
        throw new ValidationError('Username and email are required');
      }
      // TO-DO: check for existing user email

      const user = new User({ username, email });
      await user.save();
      return user;
    } catch (error) {
      throw new DatabaseError('Error creating user');
    }
  }

  async saveRecipe(userId: string, recipeId: string) {
    try {
      const user = await User.findById(userId);
      if (!user) throw new NotFoundError('User not found');

      const recipe = await Recipe.findById(recipeId);
      if (!recipe) throw new NotFoundError('Recipe not found');

      if (!user.savedRecipes.includes(recipeId)) {
        user.savedRecipes.push(recipeId);
      }
      await user.save();
      return user;
    } catch (error) {
      throw new DatabaseError('Error saving recipe for user');
    }
  }
}

export default new UserService();
