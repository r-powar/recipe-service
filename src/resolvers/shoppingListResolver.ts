import ShoppingListService from '../services/shoppingListService';

const shoppingListResolver = {
  Query: {
    generateShoppingList: async (_: any, { userId, week, year }:
            { userId: string, week: number, year: number }) => {
      try {
        return await ShoppingListService.generateShoppingList(userId, week, year);
      } catch (error) {
        throw new Error((error as Error).message);
      }
    },

  },

  Mutation: {
    markItemAsPurchased: async (_: any, { input }:
        { input: { userId: string, week: number, year: number,
            itemName: string, purchased: boolean } }) => {
      try {
        return await ShoppingListService.markItemPurchased(
          input.userId, input.week, input.year, input.itemName, input.purchased,
        );
      } catch (error) {
        throw new Error((error as Error).message);
      }
    },
  },

};

export default shoppingListResolver;
