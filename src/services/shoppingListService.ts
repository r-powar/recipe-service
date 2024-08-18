import Recipe from '../models/recipe';
import MealPlan from '../models/mealPlan';
import ShoppingList from '../models/shoppingList';

class ShoppingListService {
  async generateShoppingList(userId: string, week: number, year: number) {
    const mealPlans = await MealPlan.find({ userId, week, year }).populate('meals.recipeId');

    if (!mealPlans.length) {
      throw new Error('No meal plans found for the specified week and year');
    }

    const ingredientsMap: { [key: string]: { quantity: number, unit: string } } = {};

    // eslint-disable-next-line no-restricted-syntax
    for (const mealPlan of mealPlans) {
      // eslint-disable-next-line no-restricted-syntax
      for (const meal of mealPlan.meals) {
        const recipe = await Recipe.findById(meal.recipeId);
        if (recipe) {
          recipe.ingredients.forEach((ingredient) => {
            if (ingredientsMap[ingredient.name]) {
              ingredientsMap[ingredient.name].quantity += ingredient.quantity;
            } else {
              ingredientsMap[ingredient.name] = {
                quantity: ingredient.quantity,
                unit: ingredient.unit,
              };
            }
          });
        }
      }
    }

    const ingredients = Object.keys(ingredientsMap).map((name) => ({
      name,
      quantity: ingredientsMap[name].quantity,
      unit: ingredientsMap[name].unit,
      purchased: false,
    }));

    const shoppingList = await ShoppingList.findOneAndUpdate(
      { user: userId, week, year },
      {
        user: userId, week, year, ingredients,
      },
      { new: true, upsert: true },
    ).populate('user');

    return shoppingList;
  }

  async markItemPurchased(userId: string, week: number,
    year: number, itemName: string, purchased: boolean) {
    const shoppingList = await ShoppingList.findOne({ user: userId, week, year });

    if (!shoppingList) {
      throw new Error('Shopping list not found');
    }

    const ingredient = shoppingList.ingredients.find((item) => item.name === itemName);

    if (!ingredient) {
      throw new Error('Ingredient not found in shopping list');
    }

    ingredient.purchased = purchased;
    await shoppingList.save();

    return shoppingList;
  }
}

export default new ShoppingListService();
