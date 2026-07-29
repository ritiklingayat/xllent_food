/**
 * ============================================================================
 * Xllent Foods ERP
 * Category Service
 * Local Storage Implementation
 * ============================================================================
 */

import {
  getStorage,
  setStorage,
  addStorageItem,
  updateStorageItem,
} from "@/utils/storage";


/**
 * Storage Key
 */
const CATEGORIES_KEY = "categories";


/**
 * Category Status
 */
export const CATEGORY_STATUS = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
};


/**
 * Generate URL Slug
 */
const generateSlug = (text = "") => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-");
};


/**
 * Create unique ID
 */
const generateCategoryId = () => {
  const categories = getStorage(
    CATEGORIES_KEY,
    []
  );

  if (!categories.length) {
    return 1;
  }

  return (
    Math.max(
      ...categories.map(
        (item) => item.id
      )
    ) + 1
  );
};


/**
 * Remove unwanted fields before returning
 */
const sanitizeCategory = (category) => {
  if (!category) return null;

  return {
    ...category,
  };
};


/**
 * Validate Category Data
 */
const validateCategory = ({
  name,
}) => {

  if (!name || !name.trim()) {
    throw new Error(
      "Category name is required."
    );
  }

  if (name.trim().length < 3) {
    throw new Error(
      "Category name must contain at least 3 characters."
    );
  }

};


/**
 * Check duplicate category
 */
const isDuplicateCategory = (
  name,
  ignoreId = null
) => {

  const categories = getStorage(
    CATEGORIES_KEY,
    []
  );


  return categories.some(
    (category) =>
      category.name
        .toLowerCase()
        .trim() ===
        name.toLowerCase().trim()
      &&
      category.id !== ignoreId
  );
};


/**
 * ============================================================================
 * Get All Categories
 * ============================================================================
 */

export const getCategories = async () => {

  await new Promise(
    (resolve) =>
      setTimeout(resolve, 300)
  );


  const categories = getStorage(
    CATEGORIES_KEY,
    []
  );


  return categories.map(
    sanitizeCategory
  );
};



/**
 * ============================================================================
 * Get Category By ID
 * ============================================================================
 */

export const getCategoryById = async (
  id
) => {

  await new Promise(
    (resolve) =>
      setTimeout(resolve, 200)
  );


  const categories = getStorage(
    CATEGORIES_KEY,
    []
  );


  const category =
    categories.find(
      (item) =>
        item.id === Number(id)
    );


  if (!category) {
    throw new Error(
      "Category not found."
    );
  }


  return sanitizeCategory(
    category
  );
};
/**
 * ============================================================================
 * Create Category
 * ============================================================================
 */

export const createCategory = async (
  categoryData
) => {

  await new Promise(
    (resolve) =>
      setTimeout(resolve, 500)
  );


  validateCategory(categoryData);


  const {
    name,
    description = "",
    image = "",
    displayOrder = 0,
    status = CATEGORY_STATUS.ACTIVE,
  } = categoryData;



  if (
    isDuplicateCategory(name)
  ) {
    throw new Error(
      "Category already exists."
    );
  }



  const newCategory = {

    id: generateCategoryId(),

    name: name.trim(),

    slug: generateSlug(name),

    description,

    image,

    displayOrder:
      Number(displayOrder),

    status,

    createdAt:
      new Date().toISOString(),

    updatedAt:
      new Date().toISOString(),

  };



  const categories = getStorage(
    CATEGORIES_KEY,
    []
  );


  categories.push(
    newCategory
  );


  setStorage(
    CATEGORIES_KEY,
    categories
  );



  return {

    success: true,

    message:
      "Category created successfully.",

    category:
      sanitizeCategory(
        newCategory
      ),

  };

};




/**
 * ============================================================================
 * Update Category
 * ============================================================================
 */

export const updateCategory = async (
  id,
  categoryData
) => {

  await new Promise(
    (resolve) =>
      setTimeout(resolve, 500)
  );



  const categoryId =
    Number(id);



  const existingCategory =
    await getCategoryById(
      categoryId
    );



  const updatedName =
    categoryData.name ??
    existingCategory.name;



  validateCategory({
    name: updatedName,
  });



  if (
    isDuplicateCategory(
      updatedName,
      categoryId
    )
  ) {

    throw new Error(
      "Category already exists."
    );

  }



  const updatedCategory = {

    ...categoryData,

    id: categoryId,

    name:
      updatedName.trim(),

    slug:
      generateSlug(
        updatedName
      ),

    updatedAt:
      new Date().toISOString(),

  };



  const categories =
    getStorage(
      CATEGORIES_KEY,
      []
    );



  const index =
    categories.findIndex(
      (item) =>
        item.id === categoryId
    );



  if (index === -1) {

    throw new Error(
      "Category not found."
    );

  }



  categories[index] = {

    ...categories[index],

    ...updatedCategory,

  };



  setStorage(
    CATEGORIES_KEY,
    categories
  );



  return {

    success: true,

    message:
      "Category updated successfully.",

    category:
      sanitizeCategory(
        categories[index]
      ),

  };

};
/**
 * ============================================================================
 * Delete Category
 * ============================================================================
 */

export const deleteCategory = async (
  id
) => {

  await new Promise(
    (resolve) =>
      setTimeout(resolve, 400)
  );


  const categoryId =
    Number(id);


  const categories =
    getStorage(
      CATEGORIES_KEY,
      []
    );


  const exists =
    categories.some(
      (item) =>
        item.id === categoryId
    );


  if (!exists) {

    throw new Error(
      "Category not found."
    );

  }


  const filteredCategories =
    categories.filter(
      (item) =>
        item.id !== categoryId
    );


  setStorage(
    CATEGORIES_KEY,
    filteredCategories
  );


  return {

    success: true,

    message:
      "Category deleted successfully.",

  };

};




/**
 * ============================================================================
 * Search Categories
 * ============================================================================
 */

export const searchCategories = async (
  searchText = ""
) => {

  await new Promise(
    (resolve) =>
      setTimeout(resolve, 200)
  );


  const categories =
    getStorage(
      CATEGORIES_KEY,
      []
    );


  if (!searchText.trim()) {

    return categories;

  }


  const keyword =
    searchText
      .toLowerCase()
      .trim();



  return categories.filter(
    (category) =>
      category.name
        .toLowerCase()
        .includes(keyword)
      ||
      category.description
        ?.toLowerCase()
        .includes(keyword)
      ||
      category.slug
        ?.toLowerCase()
        .includes(keyword)
  );

};




/**
 * ============================================================================
 * Filter Categories
 * ============================================================================
 */

export const filterCategories = async ({
  status,
} = {}) => {


  const categories =
    getStorage(
      CATEGORIES_KEY,
      []
    );


  let result =
    [...categories];


  if (status) {

    result =
      result.filter(
        (category) =>
          category.status === status
      );

  }


  return result;

};




/**
 * ============================================================================
 * Sort Categories
 * ============================================================================
 */

export const sortCategories = async (
  sortBy = "name",
  order = "asc"
) => {


  const categories =
    getStorage(
      CATEGORIES_KEY,
      []
    );


  return categories.sort(
    (a, b) => {


      let first =
        a[sortBy];


      let second =
        b[sortBy];


      if (
        typeof first === "string"
      ) {

        first =
          first.toLowerCase();

        second =
          second.toLowerCase();

      }



      if (order === "asc") {

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

export const paginateCategories = async ({
  page = 1,
  limit = 10,
  data = null,
} = {}) => {


  const categories =
    data ||
    getStorage(
      CATEGORIES_KEY,
      []
    );



  const total =
    categories.length;



  const totalPages =
    Math.ceil(
      total / limit
    );



  const start =
    (page - 1) * limit;



  const paginated =
    categories.slice(
      start,
      start + limit
    );



  return {

    data:
      paginated,

    pagination: {

      page,

      limit,

      total,

      totalPages,

      hasNext:
        page < totalPages,

      hasPrevious:
        page > 1,

    },

  };

};




/**
 * ============================================================================
 * Public Categories
 * ============================================================================
 * Used by public website
 */

export const getPublicCategories =
async () => {


  const categories =
    getStorage(
      CATEGORIES_KEY,
      []
    );


  return categories.filter(
    (category) =>
      category.status ===
      CATEGORY_STATUS.ACTIVE
  );

};
/**
 * ============================================================================
 * Get Category By Slug
 * ============================================================================
 * Used by public website category pages
 */

export const getCategoryBySlug = async (
  slug
) => {

  await new Promise(
    (resolve) =>
      setTimeout(resolve, 200)
  );


  const categories =
    getStorage(
      CATEGORIES_KEY,
      []
    );


  const category =
    categories.find(
      (item) =>
        item.slug === slug
    );


  if (!category) {

    throw new Error(
      "Category not found."
    );

  }


  return sanitizeCategory(
    category
  );

};




/**
 * ============================================================================
 * Get Category Statistics
 * ============================================================================
 * Used in Dashboard cards
 */

export const getCategoryStats =
async () => {


  const categories =
    getStorage(
      CATEGORIES_KEY,
      []
    );



  const total =
    categories.length;



  const active =
    categories.filter(
      (category) =>
        category.status ===
        CATEGORY_STATUS.ACTIVE
    ).length;



  const inactive =
    categories.filter(
      (category) =>
        category.status ===
        CATEGORY_STATUS.INACTIVE
    ).length;



  return {

    total,

    active,

    inactive,

  };

};




/**
 * ============================================================================
 * Get Category Count
 * ============================================================================
 */

export const getCategoryCount =
async () => {


  const categories =
    getStorage(
      CATEGORIES_KEY,
      []
    );


  return categories.length;

};




/**
 * ============================================================================
 * Bulk Delete Categories
 * ============================================================================
 */

export const bulkDeleteCategories =
async (
  ids = []
) => {


  if (!Array.isArray(ids)
      || ids.length === 0) {

    throw new Error(
      "No categories selected."
    );

  }



  const categories =
    getStorage(
      CATEGORIES_KEY,
      []
    );



  const filtered =
    categories.filter(
      (category) =>
        !ids.includes(
          category.id
        )
    );



  setStorage(
    CATEGORIES_KEY,
    filtered
  );



  return {

    success:true,

    message:
      "Categories deleted successfully.",

  };

};




/**
 * ============================================================================
 * Default Export
 * ============================================================================
 */

const categoryService = {

  getCategories,

  getCategoryById,

  getCategoryBySlug,

  createCategory,

  updateCategory,

  deleteCategory,

  searchCategories,

  filterCategories,

  sortCategories,

  paginateCategories,

  getPublicCategories,

  getCategoryStats,

  getCategoryCount,

  bulkDeleteCategories,

};


export default categoryService;