import apiClient from "@/api/apiClient";


export const mediaApi = {


    uploadImage(formData){

        return apiClient.post(
            "/media/upload",
            formData,
            {
                headers:{
                    "Content-Type":
                    "multipart/form-data"
                }
            }
        );

    },


    deleteImage(id){

        return apiClient.delete(
            `/media/${id}`
        );

    },


    getMedia(){

        return apiClient.get(
            "/media"
        );

    }


};