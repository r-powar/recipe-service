import { MealPlanInput } from '../types';
import MealPlan from '../models/mealPlan';
import { NotFoundError, ValidationError } from '../errors';
import User from '../models/users';

class MealPlanService {
  async getMealPlansByUserId(userId: string) {
    try {
      const user = await User.findById(userId);
      if (!user) throw new NotFoundError('User not found');

      const mealPlans = await MealPlan.find({ userId });
      return mealPlans;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async createMealPlan(input: MealPlanInput) {
    try {
      if (!input.userId || !input.week || !input.year || !input.meals) {
        throw new ValidationError('User ID, week, year, and meals are required');
      }
      const mealPlan = new MealPlan(input);
      return await mealPlan.save();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}

export default new MealPlanService();
