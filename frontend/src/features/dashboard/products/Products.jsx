import React, {
  useEffect,
  useMemo,
  useState
} from "react";

import { useNavigate }
  from "react-router-dom";

import ProductTable
  from "./ProductTable";

import { productService }
  from "@/features/products/services/productService";

import { categoryService }
  from "@/features/categories/services/categoryService";

export default function Products() {

  const navigate = useNavigate();

  const [products, setProducts] =
    useState([]);

  const [categories, setCategories] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [categoryFilter, setCategoryFilter] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadData = async () => {

    setLoading(true);
    setError("");

    try {

      const [
        productData,
        categoryData
      ] = await Promise.all([
        productService.fetchProducts(),
        categoryService.fetchCategories()
      ]);

      setProducts(
        Array.isArray(productData)
          ? productData
          : []
      );

      setCategories(
        Array.isArray(categoryData)
          ? categoryData
          : []
      );

    } catch (requestError) {

      console.error(requestError);

      setError(
        requestError.response?.data?.message ||
        requestError.response?.data?.error ||
        "Unable to load products."
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredProducts =
    useMemo(() => {

      return products.filter(product => {

        const productName =
          product.productName || "";

        const matchesSearch =
          productName
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesCategory =
          categoryFilter
            ? String(product.categoryId) ===
              String(categoryFilter)
            : true;

        const matchesStatus =
          statusFilter
            ? product.status === statusFilter
            : true;

        return (
          matchesSearch &&
          matchesCategory &&
          matchesStatus
        );
      });

    }, [
      products,
      search,
      categoryFilter,
      statusFilter
    ]);

  const handleDelete = async product => {

    const confirmed =
      window.confirm(
        `Delete ${product.productName}?`
      );

    if (!confirmed) {
      return;
    }

    try {

      await productService.deleteProduct(
        product.id
      );

      setProducts(previous =>
        previous.filter(item =>
          item.id !== product.id
        )
      );

    } catch (requestError) {

      console.error(requestError);

      alert(
        requestError.response?.data?.message ||
        requestError.response?.data?.error ||
        "Unable to delete product."
      );
    }
  };

  const handleEdit = product => {

    navigate(
      `/dashboard/products/edit/${product.id}`
    );
  };

  return (
    <div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Products
          </h1>

          <p className="text-slate-500 mt-1">
            Manage product pricing and inventory.
          </p>
        </div>

        <button
          onClick={() =>
            navigate(
              "/dashboard/products/create"
            )
          }
          className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl"
        >
          + Add Product
        </button>

      </div>

      {error && (
        <div className="mb-5 p-4 rounded-xl bg-red-50 text-red-700">
          {error}

          <button
            onClick={loadData}
            className="ml-3 underline"
          >
            Retry
          </button>
        </div>
      )}

      <div className="bg-white p-5 rounded-2xl shadow-sm mb-6">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <input
            type="text"
            value={search}
            onChange={event =>
              setSearch(event.target.value)
            }
            placeholder="Search products..."
            className="border rounded-lg px-4 py-3"
          />

          <select
            value={categoryFilter}
            onChange={event =>
              setCategoryFilter(
                event.target.value
              )
            }
            className="border rounded-lg px-4 py-3"
          >
            <option value="">
              All Categories
            </option>

            {categories.map(category => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.categoryName}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={event =>
              setStatusFilter(
                event.target.value
              )
            }
            className="border rounded-lg px-4 py-3"
          >
            <option value="">
              All Statuses
            </option>

            <option value="ACTIVE">
              Active
            </option>

            <option value="INACTIVE">
              Inactive
            </option>
          </select>

        </div>

      </div>

      {loading ? (
        <div className="bg-white p-10 rounded-2xl text-center">
          Loading products...
        </div>
      ) : (
        <ProductTable
          products={filteredProducts}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

    </div>
  );
}