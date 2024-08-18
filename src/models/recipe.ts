import { Schema, model, Document } from 'mongoose';

interface IRecipe extends Document{
    name: string,
    desciprtion: string,
    ingredients: {name: string, quantity: number, unit: string}[],
    instructions: string[],
    preparationTime: string,
    cookingTime: string,
    tags: string[],
    cuisineType: string,
    difficultyLevel: string,
}

const recipeSchema = new Schema<IRecipe>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  ingredients: [{
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    unit: { type: String, required: true },
  }],
  instructions: { type: [String], required: true },
  preparationTime: { type: String, required: true },
  cookingTime: { type: String, required: true },
  tags: { type: [String], required: true },
  cuisineType: { type: String, required: true },
  difficultyLevel: { type: String, required: true },
});

const Recipe = model<IRecipe>('Recipe', recipeSchema);

export default Recipe;
