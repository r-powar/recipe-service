export interface IngredientInput {
    name: string;
    quantity: number;
    unit: string;
}

export interface RecipeInput {
    name: string;
    description: string;
    ingredients: IngredientInput[];
    instructions: string[];
    preparationTime: string;
    cookingTime: string;
    tags: string[];
    cuisineType: string;
    difficultyLevel: string;
}

export interface RecipeSearchInput{
    keyword?: string;
    tags?: string[];
    cuisineType?: string;
    difficultyLevel?: string;
}

export interface MealInput {
    day: string;
    mealType: string;
    recipeId: string;
}

export interface MealPlanInput {
    userId: string;
    week: number;
    year: number;
    meals: MealInput[];
}

export interface MarkIngredientAsPurchasedInput {
    mealPlanId: string;
    ingredientName: string;
    purchased: boolean;
}
