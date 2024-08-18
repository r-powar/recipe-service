import { Schema, model, Document } from 'mongoose';

interface IMealPlan extends Document{
    userId: string,
    week: string,
    year: string,
    meals: {day: string, mealType: string, recipeId: string }[],
}

const mealPlanSchema = new Schema<IMealPlan>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  week: { type: Number, required: true },
  year: { type: Number, required: true },
  meals: [{
    day: { type: String, required: true },
    mealType: { type: String, required: true },
    recipeId: { type: Schema.Types.ObjectId, ref: 'Recipe', required: true },
  }],
});

const MealPlan = model<IMealPlan>('MealPlan', mealPlanSchema);

export default MealPlan;
