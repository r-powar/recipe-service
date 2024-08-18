import UserService from '../services/userService';

const userResolvers = {
  Mutation: {
    createUser: async (_: any, { username, email }: { username: string; email: string }) => {
      try {
        return await UserService.createUser(username, email);
      } catch (error) {
        throw new Error((error as Error).message);
      }
    },
    saveRecipe: async (_: any, { userId, recipeId }: { userId: string; recipeId: string }) => {
      try {
        return await UserService.saveRecipe(userId, recipeId);
      } catch (error) {
        throw new Error((error as Error).message);
      }
    },
  },
};

export default userResolvers;
