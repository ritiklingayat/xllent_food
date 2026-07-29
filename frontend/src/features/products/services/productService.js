import { productApi } from "../api/productApi";

export const productService = {

  async fetchProducts() {
    const response =
      await productApi.getProducts();

    return response.data;
  },

  async fetchProduct(id) {
    const response =
      await productApi.getProductById(id);

    return response.data;
  },

  async createProduct(formData) {
    const response =
      await productApi.createProduct(formData);

    return response.data;
  },

  async updateProduct(id, formData) {
    const response =
      await productApi.updateProduct(id, formData);

    return response.data;
  },

  async deleteProduct(id) {
    await productApi.deleteProduct(id);
    return true;
  }
};