import {
  setStorage,
  getStorage,
} from "@/utils/storage";


import users from "@/mock/users";
import categories from "@/mock/categories";
import products from "@/mock/products";



const initializeAppData = () => {


  if(
    !getStorage("users")
  ){

    setStorage(
      "users",
      users
    );

  }



  if(
    !getStorage("categories")
  ){

    setStorage(
      "categories",
      categories
    );

  }




  if(
    !getStorage("products")
  ){

    setStorage(
      "products",
      products
    );

  }



};


export default initializeAppData;