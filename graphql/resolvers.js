import Recipe from "../models/recipe.js";

export const resolvers = {
  Query: {
    async recipe(_, { ID }) {
      return await Recipe.findById(ID);
    },

    async getRecipes(_, { amount }) {
      return await Recipe.find().sort({ createdAt: -1 }).limit(amount);
    },
  },
  Mutation: {
    async createRecipe(_, { recipeInput: { name, description } }) {
      const recipe = await Recipe.create({
        name,
        description,
        createdAt: new Date().toISOString(),
        thumbsUp: 0,
        thumbsDown: 0,
      });

      return recipe;
    },
    async deleteRecipe(_, { ID }) {
      const wasDeleted = (await Recipe.deleteOne({ _id: ID })).deletedCount;
      return wasDeleted;
    },
    async editRecipe(_, { ID, recipeInput: { name, description } }) {
      const wasEditted = (
        await Recipe.updateOne({ _id: ID }, { name, description })
      ).modifiedCount;

      return wasEditted;
    },
  },
};
