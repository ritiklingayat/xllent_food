import { categoryApi } from "../api/categoryApi";

export const categoryService = {

  async fetchCategories() {
    const response =
      await categoryApi.getCategories();

    return response.data;
  },

  async fetchCategory(id) {
    const response =
      await categoryApi.getCategoryById(id);

    return response.data;
  },

  async createCategory(data) {
    const response =
      await categoryApi.createCategory(data);

    return response.data;
  },

  async updateCategory(id, data) {
    const response =
      await categoryApi.updateCategory(id, data);

    return response.data;
  },

  async deleteCategory(id) {
    await categoryApi.deleteCategory(id);
    return true;
  }
};