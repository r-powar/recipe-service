module.exports = {
  async up(db, client) {
    // Create Users collection with indexes
    await db.createCollection('users');
    await db.collection('users').createIndex({ username: 1 });
    await db.collection('users').createIndex({ email: 1 }, { unique: true });

    // Create Recipes collection with indexes
    await db.createCollection('recipes');
    await db.collection('recipes').createIndex({ name: 1 });
    await db.collection('recipes').createIndex({ tags: 1 });
    await db.collection('recipes').createIndex({ cuisineType: 1 });
    await db.collection('recipes').createIndex({ difficultyLevel: 1 });

    // Create MealPlan collection
    await db.createCollection('mealplans');

    // Add initial data for testing (optional)
    await db.collection('users').insertOne({
      username: 'testUser1',
      email: 'test@abc.com',
      savedRecipes: [],
    });
  },

  async down(db, client) {
    // Drop collections
    await db.collection('mealplans').drop();
    await db.collection('recipes').drop();
    await db.collection('users').drop();
  },
};
