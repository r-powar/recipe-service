import MealPlanService from '../services/mealPlanService';
import { MealPlanInput } from '../types';

const mealPlanResolvers = {
  Query: {
    getMealPlans: async (_: any, { userId }: { userId: string }) => {
      try {
        return await MealPlanService.getMealPlansByUserId(userId);
      } catch (error) {
        throw new Error((error as Error).message);
      }
    },
  },
  Mutation: {
    createMealPlan: async (_: any, { input }: { input: MealPlanInput }) => {
      try {
        return await MealPlanService.createMealPlan(input);
      } catch (error) {
        throw new Error((error as Error).message);
      }
    },
  },

};

export default mealPlanResolvers;
