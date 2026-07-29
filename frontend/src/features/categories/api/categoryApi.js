import apiClient from "@/api/apiClient";


export const categoryApi = {


    getCategories(){

        return apiClient.get(
            "/categories"
        );

    },


    getCategoryById(id){

        return apiClient.get(
            `/categories/${id}`
        );

    },


    createCategory(data){

        return apiClient.post(
            "/categories",
            data
        );

    },


    updateCategory(id,data){

        return apiClient.put(
            `/categories/${id}`,
            data
        );

    },


    deleteCategory(id){

        return apiClient.delete(
            `/categories/${id}`
        );

    }


};