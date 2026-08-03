/**
 * ============================================================================
 * Xllent Foods ERP
 * Product Service
 * Local Storage Implementation
 * ============================================================================
 */


import {
  getStorage,
  setStorage,
} from "@/utils/storage";


/**
 * Storage Key
 */
const PRODUCTS_KEY = "products";


/**
 * Product Status
 */
export const PRODUCT_STATUS = {

  ACTIVE: "ACTIVE",

  INACTIVE: "INACTIVE",

  OUT_OF_STOCK: "OUT_OF_STOCK",

};



/**
 * Generate Product Slug
 */

const generateSlug = (
  text = ""
) => {

  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-");

};



/**
 * Generate Product ID
 */

const generateProductId = () => {


  const products =
    getStorage(
      PRODUCTS_KEY,
      []
    );


  if (!products.length) {

    return 1;

  }


  return (

    Math.max(
      ...products.map(
        (item)=>
          item.id
      )
    )
    + 1

  );

};



/**
 * Remove unwanted fields
 */

const sanitizeProduct = (
  product
) => {

  if (!product) {

    return null;

  }


  return {

    ...product,

  };

};



/**
 * Validate Product
 */

const validateProduct = ({
  name,
  sku,
  sellingPrice,
}) => {


  if (
    !name ||
    !name.trim()
  ) {

    throw new Error(
      "Product name is required."
    );

  }



  if (
    !sku ||
    !sku.trim()
  ) {

    throw new Error(
      "SKU is required."
    );

  }



  if (
    sellingPrice === undefined ||
    sellingPrice === null
  ) {

    throw new Error(
      "Selling price is required."
    );

  }

};



/**
 * Check Duplicate Product
 */

const isDuplicateProduct = (
  sku,
  ignoreId = null
) => {


  const products =
    getStorage(
      PRODUCTS_KEY,
      []
    );


  return products.some(
    (product)=>

      product.sku
        .toLowerCase()
        .trim()
      ===
      sku
        .toLowerCase()
        .trim()

      &&

      product.id !== ignoreId

  );

};




/**
 * ============================================================================
 * Get All Products
 * ============================================================================
 */

export const getProducts =
async () => {


  await new Promise(
    (resolve)=>
      setTimeout(
        resolve,
        300
      )
  );


  const products =
    getStorage(
      PRODUCTS_KEY,
      []
    ) || [];


  return products.map(
    sanitizeProduct
  );

};





/**
 * ============================================================================
 * Get Product By ID
 * ============================================================================
 */

export const getProductById =
async (
  id
) => {


  await new Promise(
    (resolve)=>
      setTimeout(
        resolve,
        200
      )
  );


  const products =
    getStorage(
      PRODUCTS_KEY,
      []
    );


  const product =
    products.find(
      (item)=>
        item.id === Number(id)
    );



  if (!product) {

    throw new Error(
      "Product not found."
    );

  }



  return sanitizeProduct(
    product
  );

};
/**
 * ============================================================================
 * Create Product
 * ============================================================================
 */

export const createProduct = async (
  productData
) => {

  await new Promise(
    (resolve) =>
      setTimeout(resolve, 500)
  );


  validateProduct(productData);



  const {
    name,
    sku,
    categoryId,
    brand = "Xllent Foods",

    shortDescription = "",

    description = "",

    mrp = 0,

    sellingPrice,

    gst = 0,

    stock = 0,

    unit = "",

    weight = "",

    featured = false,

    thumbnail = "",

    images = [],

    status = PRODUCT_STATUS.ACTIVE,

  } = productData;




  if (
    isDuplicateProduct(sku)
  ) {

    throw new Error(
      "Product SKU already exists."
    );

  }




  const newProduct = {

    id:
      generateProductId(),


    name:
      name.trim(),


    slug:
      generateSlug(name),


    sku:
      sku.trim()
        .toUpperCase(),


    categoryId:
      Number(categoryId),


    brand,


    shortDescription,


    description,


    mrp:
      Number(mrp),


    sellingPrice:
      Number(sellingPrice),


    gst:
      Number(gst),


    stock:
      Number(stock),


    unit,


    weight,


    featured:


      Boolean(featured),


    thumbnail,


    images,


    status,


    createdAt:

      new Date()
        .toISOString(),


    updatedAt:

      new Date()
        .toISOString(),

  };




  const products =
    getStorage(
      PRODUCTS_KEY,
      []
    );



  products.push(
    newProduct
  );



  setStorage(
    PRODUCTS_KEY,
    products
  );




  return {

    success:true,


    message:
      "Product created successfully.",


    product:
      sanitizeProduct(
        newProduct
      ),

  };

};






/**
 * ============================================================================
 * Update Product
 * ============================================================================
 */

export const updateProduct = async (
  id,
  productData
) => {


  await new Promise(
    (resolve)=>
      setTimeout(
        resolve,
        500
      )
  );



  const productId =
    Number(id);



  const existingProduct =
    await getProductById(
      productId
    );




  const updatedName =
    productData.name ??
    existingProduct.name;



  const updatedSku =
    productData.sku ??
    existingProduct.sku;



  validateProduct({

    name:
      updatedName,


    sku:
      updatedSku,


    sellingPrice:

      productData.sellingPrice ??
      existingProduct.sellingPrice,

  });





  if (

    isDuplicateProduct(

      updatedSku,

      productId

    )

  ) {

    throw new Error(
      "Product SKU already exists."
    );

  }






  const updatedProduct = {


    ...productData,



    id:
      productId,



    name:
      updatedName.trim(),



    sku:
      updatedSku
        .trim()
        .toUpperCase(),



    slug:
      generateSlug(
        updatedName
      ),



    updatedAt:

      new Date()
        .toISOString(),

  };






  const products =
    getStorage(
      PRODUCTS_KEY,
      []
    );




  const index =
    products.findIndex(
      (item)=>
        item.id === productId
    );





  if(index === -1){

    throw new Error(
      "Product not found."
    );

  }





  products[index] = {

    ...products[index],

    ...updatedProduct,

  };





  setStorage(
    PRODUCTS_KEY,
    products
  );





  return {

    success:true,


    message:

      "Product updated successfully.",



    product:

      sanitizeProduct(
        products[index]
      ),

  };

};
/**
 * ============================================================================
 * Delete Product
 * ============================================================================
 */

export const deleteProduct = async (
  id
) => {

  await new Promise(
    (resolve) =>
      setTimeout(resolve, 400)
  );


  const productId =
    Number(id);


  const products =
    getStorage(
      PRODUCTS_KEY,
      []
    );


  const exists =
    products.some(
      (product) =>
        product.id === productId
    );


  if (!exists) {

    throw new Error(
      "Product not found."
    );

  }


  const filteredProducts =
    products.filter(
      (product) =>
        product.id !== productId
    );


  setStorage(
    PRODUCTS_KEY,
    filteredProducts
  );


  return {

    success: true,

    message:
      "Product deleted successfully.",

  };

};





/**
 * ============================================================================
 * Bulk Delete Products
 * ============================================================================
 */

export const bulkDeleteProducts =
async (
  ids = []
) => {


  if (
    !Array.isArray(ids)
    ||
    ids.length === 0
  ) {

    throw new Error(
      "No products selected."
    );

  }



  const products =
    getStorage(
      PRODUCTS_KEY,
      []
    );



  const filtered =
    products.filter(
      (product) =>
        !ids.includes(
          product.id
        )
    );



  setStorage(
    PRODUCTS_KEY,
    filtered
  );



  return {

    success:true,

    message:
      "Products deleted successfully.",

  };

};






/**
 * ============================================================================
 * Search Products
 * ============================================================================
 */

export const searchProducts =
async (
  searchText = ""
) => {


  await new Promise(
    (resolve)=>
      setTimeout(
        resolve,
        200
      )
  );



  const products =
    getStorage(
      PRODUCTS_KEY,
      []
    );



  if(
    !searchText.trim()
  ){

    return products;

  }



  const keyword =
    searchText
      .toLowerCase()
      .trim();



  return products.filter(
    (product)=>

      product.name
        .toLowerCase()
        .includes(keyword)

      ||

      product.sku
        .toLowerCase()
        .includes(keyword)

      ||

      product.brand
        ?.toLowerCase()
        .includes(keyword)

      ||

      product.description
        ?.toLowerCase()
        .includes(keyword)

  );

};






/**
 * ============================================================================
 * Filter Products
 * ============================================================================
 */

export const filterProducts =
async ({
  categoryId,
  status,
  featured,
} = {}) => {


  let products =
    getStorage(
      PRODUCTS_KEY,
      []
    );



  if(categoryId){

    products =
      products.filter(
        (product)=>

          product.categoryId
          ===
          Number(categoryId)

      );

  }



  if(status){

    products =
      products.filter(
        (product)=>

          product.status
          ===
          status

      );

  }




  if(
    featured !== undefined
  ){

    products =
      products.filter(
        (product)=>

          product.featured
          ===
          featured

      );

  }



  return products;

};







/**
 * ============================================================================
 * Sort Products
 * ============================================================================
 */

export const sortProducts =
async (
  sortBy="name",
  order="asc"
) => {


  const products =
    getStorage(
      PRODUCTS_KEY,
      []
    );



  return products.sort(
    (a,b)=>{


      let first =
        a[sortBy];


      let second =
        b[sortBy];



      if(
        typeof first === "string"
      ){

        first =
          first.toLowerCase();

        second =
          second.toLowerCase();

      }



      if(order==="asc"){

        return first > second
          ? 1
          : -1;

      }



      return first < second
        ? 1
        : -1;


    }
  );

};







/**
 * ============================================================================
 * Pagination
 * ============================================================================
 */

export const paginateProducts =
async ({
  page=1,
  limit=10,
  data=null,

}={}) => {


  const products =
    data ||
    getStorage(
      PRODUCTS_KEY,
      []
    );



  const total =
    products.length;



  const totalPages =
    Math.ceil(
      total / limit
    );



  const start =
    (page-1)
    *
    limit;



  const result =
    products.slice(
      start,
      start + limit
    );



  return {

    data:
      result,


    pagination:{

      page,

      limit,

      total,

      totalPages,


      hasNext:
        page < totalPages,


      hasPrevious:
        page > 1,

    }

  };

};
/**
 * ============================================================================
 * Get Featured Products
 * ============================================================================
 * Used on public website homepage
 */

export const getFeaturedProducts =
async () => {


  const products =
    getStorage(
      PRODUCTS_KEY,
      []
    );


  return products.filter(
    (product) =>
      product.featured === true
      &&
      product.status === PRODUCT_STATUS.ACTIVE
  );

};





/**
 * ============================================================================
 * Get Products By Category
 * ============================================================================
 * Used on category pages
 */

export const getProductsByCategory =
async (
  categoryId
) => {


  const products =
    getStorage(
      PRODUCTS_KEY,
      []
    );


  return products.filter(
    (product) =>

      product.categoryId ===
      Number(categoryId)

      &&

      product.status ===
      PRODUCT_STATUS.ACTIVE

  );

};






/**
 * ============================================================================
 * Get Product By Slug
 * ============================================================================
 * Used for public product details page
 */

export const getProductBySlug =
async (
  slug
) => {


  await new Promise(
    (resolve)=>
      setTimeout(
        resolve,
        200
      )
  );


  const products =
    getStorage(
      PRODUCTS_KEY,
      []
    );



  const product =
    products.find(
      (item)=>
        item.slug === slug
    );



  if(!product){

    throw new Error(
      "Product not found."
    );

  }



  return sanitizeProduct(
    product
  );

};






/**
 * ============================================================================
 * Get Public Products
 * ============================================================================
 * Used by public website
 */

export const getPublicProducts =
async () => {


  const products =
    getStorage(
      PRODUCTS_KEY,
      []
    );


  return products.filter(
    (product)=>

      product.status ===
      PRODUCT_STATUS.ACTIVE

  );

};






/**
 * ============================================================================
 * Update Product Stock
 * ============================================================================
 */

export const updateStock =
async (
  id,
  quantity
) => {


  const productId =
    Number(id);



  const products =
    getStorage(
      PRODUCTS_KEY,
      []
    );



  const index =
    products.findIndex(
      (product)=>
        product.id === productId
    );



  if(index === -1){

    throw new Error(
      "Product not found."
    );

  }



  products[index].stock =
    Number(quantity);



  if(
    products[index].stock <= 0
  ){

    products[index].status =
      PRODUCT_STATUS.OUT_OF_STOCK;

  }
  else {

    products[index].status =
      PRODUCT_STATUS.ACTIVE;

  }



  products[index].updatedAt =
    new Date()
      .toISOString();



  setStorage(
    PRODUCTS_KEY,
    products
  );



  return {

    success:true,

    message:
      "Stock updated successfully.",

    product:
      products[index],

  };

};







/**
 * ============================================================================
 * Product Statistics
 * ============================================================================
 * Dashboard Analytics
 */

export const getProductStats =
async () => {


  const products =
    getStorage(
      PRODUCTS_KEY,
      []
    );



  const total =
    products.length;



  const active =
    products.filter(
      (product)=>
        product.status ===
        PRODUCT_STATUS.ACTIVE
    ).length;



  const inactive =
    products.filter(
      (product)=>
        product.status ===
        PRODUCT_STATUS.INACTIVE
    ).length;



  const outOfStock =
    products.filter(
      (product)=>
        product.status ===
        PRODUCT_STATUS.OUT_OF_STOCK
    ).length;



  const featured =
    products.filter(
      (product)=>
        product.featured === true
    ).length;



  const totalStock =
    products.reduce(
      (sum,product)=>
        sum + Number(product.stock || 0),
      0
    );



  return {

    total,

    active,

    inactive,

    outOfStock,

    featured,

    totalStock,

  };

};






/**
 * ============================================================================
 * Product Count
 * ============================================================================
 */

export const getProductCount =
async () => {


  const products =
    getStorage(
      PRODUCTS_KEY,
      []
    );


  return products.length;

};






/**
 * ============================================================================
 * Default Export
 * ============================================================================
 */

const productService = {


  // Basic CRUD

  getProducts,

  getProductById,

  createProduct,

  updateProduct,

  deleteProduct,



  // Bulk

  bulkDeleteProducts,



  // Search / Filter

  searchProducts,

  filterProducts,

  sortProducts,

  paginateProducts,



  // Public Website

  getPublicProducts,

  getFeaturedProducts,

  getProductsByCategory,

  getProductBySlug,



  // Inventory

  updateStock,



  // Analytics

  getProductStats,

  getProductCount,

};


export default productService;