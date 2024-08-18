module.exports = {
  async up(db, client) {
    // Create ShoppingList collection
    await db.createCollection('shoppinglists');
  },

  async down(db, client) {
    await db.collection('shoppinglists').drop();
  },
};
