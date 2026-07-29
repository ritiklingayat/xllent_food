import {
    mediaApi
}
from "../api/mediaApi";



export const mediaService = {


async uploadImage(file){


const formData =
new FormData();


formData.append(
"image",
file
);



const response =
await mediaApi.uploadImage(
formData
);


return response.data;


},



async deleteImage(id){

await mediaApi.deleteImage(id);

return true;

},



async fetchMedia(){

const response =
await mediaApi.getMedia();


return response.data;

}


};