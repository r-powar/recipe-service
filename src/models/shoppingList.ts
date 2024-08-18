import { Schema, model, Document } from 'mongoose';

interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
  purchased: boolean;
}

interface ShoppingListDocument extends Document {
  user: string;
  week: number;
  year: number;
  ingredients: Ingredient[];
}

const ingredientSchema = new Schema<Ingredient>({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true },
  purchased: { type: Boolean, default: false },
});

const shoppingListSchema = new Schema<ShoppingListDocument>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  week: { type: Number, required: true },
  year: { type: Number, required: true },
  ingredients: [ingredientSchema],
});

const ShoppingList = model<ShoppingListDocument>('ShoppingList', shoppingListSchema);

export default ShoppingList;
