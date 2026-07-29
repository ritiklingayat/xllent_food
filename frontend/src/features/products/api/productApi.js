import apiClient from "@/api/apiClient";

export const productApi = {

  getProducts() {
    return apiClient.get("/products");
  },

  getProductById(id) {
    return apiClient.get(`/products/${id}`);
  },

  createProduct(formData) {
    return apiClient.post(
      "/products",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );
  },

  updateProduct(id, formData) {
    return apiClient.put(
      `/products/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );
  },

  deleteProduct(id) {
    return apiClient.delete(`/products/${id}`);
  }
};