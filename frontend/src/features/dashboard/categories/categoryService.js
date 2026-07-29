import apiClient from "@/api/apiClient";

export async function getAllCategories() {
  const response = await apiClient.get("/categories");
  return response.data;
}

export async function createCategory(categoryData) {
  const response = await apiClient.post(
    "/categories",
    categoryData
  );

  return response.data;
}

export async function updateCategory(
  categoryId,
  categoryData
) {
  const response = await apiClient.put(
    `/categories/${categoryId}`,
    categoryData
  );

  return response.data;
}

export async function deleteCategory(categoryId) {
  const response = await apiClient.delete(
    `/categories/${categoryId}`
  );

  return response.data;
}