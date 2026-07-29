import React, {
  useEffect,
  useState
} from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import { productService }
  from "@/features/products/services/productService";

import { categoryService }
  from "@/features/categories/services/categoryService";

const initialForm = {
  productName: "",
  description: "",
  categoryId: "",
  mrp: "",
  gst: "",
  superStockistPrice: "",
  distributorPrice: "",
  shopPrice: "",
  pieces: "",
  packets: "",
  stock_Cartons: "",
  status: "ACTIVE",
  image: null
};

export default function ProductForm() {

  const navigate = useNavigate();
  const { id } = useParams();

  const isEditMode = Boolean(id);

  const [form, setForm] =
    useState(initialForm);

  const [categories, setCategories] =
    useState([]);

  const [preview, setPreview] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [pageLoading, setPageLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {

    async function loadData() {

      setPageLoading(true);
      setError("");

      try {

        const categoryData =
          await categoryService.fetchCategories();

        setCategories(
          Array.isArray(categoryData)
            ? categoryData
            : []
        );

        if (isEditMode) {

          const product =
            await productService.fetchProduct(id);

          setForm({
            productName:
              product.productName ?? "",

            description:
              product.description ?? "",

            categoryId:
              product.categoryId ?? "",

            mrp:
              product.mrp ?? "",

            gst:
              product.gst ?? "",

            superStockistPrice:
              product.superStockistPrice ?? "",

            distributorPrice:
              product.distributorPrice ?? "",

            shopPrice:
              product.shopPrice ?? "",

            pieces:
              product.pieces ?? "",

            packets:
              product.packets ?? "",

            stock_Cartons:
              product.stock_Cartons ?? "",

            status:
              product.status ?? "ACTIVE",

            image: null
          });

          setPreview(
            product.imageUrl ?? ""
          );
        }

      } catch (requestError) {

        console.error(requestError);

        setError(
          requestError.response?.data?.message ||
          requestError.response?.data?.error ||
          "Unable to load product form."
        );

      } finally {
        setPageLoading(false);
      }
    }

    loadData();

  }, [id, isEditMode]);

  const handleChange = (event) => {

    const { name, value } =
      event.target;

    setForm(previous => ({
      ...previous,
      [name]: value
    }));
  };

  const handleImage = (event) => {

    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError(
        "Please select a valid image file."
      );
      return;
    }

    setForm(previous => ({
      ...previous,
      image: file
    }));

    setPreview(
      URL.createObjectURL(file)
    );
  };

  const validateForm = () => {

    if (!form.productName.trim()) {
      return "Product name is required.";
    }

    if (!form.categoryId) {
      return "Please select a category.";
    }

    const numericFields = [
      "mrp",
      "gst",
      "superStockistPrice",
      "distributorPrice",
      "shopPrice",
      "pieces",
      "packets",
      "stock_Cartons"
    ];

    for (const field of numericFields) {

      if (
        form[field] === "" ||
        Number(form[field]) < 0
      ) {
        return `${field} must contain a valid value.`;
      }
    }

    return "";
  };

  const createFormData = () => {

    const formData =
      new FormData();

    formData.append(
      "productName",
      form.productName.trim()
    );

    formData.append(
      "description",
      form.description || ""
    );

    formData.append(
      "categoryId",
      String(form.categoryId)
    );

    formData.append(
      "mrp",
      String(form.mrp)
    );

    formData.append(
      "gst",
      String(form.gst)
    );

    formData.append(
      "superStockistPrice",
      String(form.superStockistPrice)
    );

    formData.append(
      "distributorPrice",
      String(form.distributorPrice)
    );

    formData.append(
      "shopPrice",
      String(form.shopPrice)
    );

    formData.append(
      "pieces",
      String(form.pieces)
    );

    formData.append(
      "packets",
      String(form.packets)
    );

    formData.append(
      "stock_Cartons",
      String(form.stock_Cartons)
    );

    formData.append(
      "status",
      form.status
    );

    if (form.image instanceof File) {
      formData.append(
        "image",
        form.image
      );
    }

    return formData;
  };

  const handleSubmit = async event => {

    event.preventDefault();

    const validationError =
      validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");

    try {

      const formData =
        createFormData();

      if (isEditMode) {
        await productService.updateProduct(
          id,
          formData
        );
      } else {
        await productService.createProduct(
          formData
        );
      }

      navigate(
        "/dashboard/products",
        { replace: true }
      );

    } catch (requestError) {

      console.error(requestError);

      const responseData =
        requestError.response?.data;

      setError(
        responseData?.message ||
        responseData?.error ||
        (typeof responseData === "string"
          ? responseData
          : "Unable to save product.")
      );

    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="p-10 text-center">
        Loading product form...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">

      <div className="flex items-center justify-between mb-6">

        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            {isEditMode
              ? "Edit Product"
              : "Add Product"}
          </h1>

          <p className="text-slate-500 mt-1">
            Enter product, pricing and stock details.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            navigate("/dashboard/products")
          }
          className="px-4 py-2 border rounded-lg"
        >
          Back
        </button>

      </div>

      {error && (
        <div className="mb-5 p-4 rounded-lg bg-red-50 text-red-700">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-sm p-6"
      >

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div>
            <label className="block mb-2 font-medium">
              Product Name *
            </label>

            <input
              type="text"
              name="productName"
              value={form.productName}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
              placeholder="Enter product name"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Category *
            </label>

            <select
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            >
              <option value="">
                Select Category
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
          </div>

          <div className="md:col-span-2">
            <label className="block mb-2 font-medium">
              Description
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              className="w-full border rounded-lg px-4 py-3"
              placeholder="Enter product description"
            />
          </div>

          <NumberField
            label="MRP"
            name="mrp"
            value={form.mrp}
            onChange={handleChange}
          />

          <NumberField
            label="GST Percentage"
            name="gst"
            value={form.gst}
            onChange={handleChange}
          />

          <NumberField
            label="Super Stockist Price"
            name="superStockistPrice"
            value={form.superStockistPrice}
            onChange={handleChange}
          />

          <NumberField
            label="Distributor Price"
            name="distributorPrice"
            value={form.distributorPrice}
            onChange={handleChange}
          />

          <NumberField
            label="Shop Price"
            name="shopPrice"
            value={form.shopPrice}
            onChange={handleChange}
          />

          <NumberField
            label="Pieces Per Packet"
            name="pieces"
            value={form.pieces}
            onChange={handleChange}
            step="1"
          />

          <NumberField
            label="Packets Per Carton"
            name="packets"
            value={form.packets}
            onChange={handleChange}
            step="1"
          />

          <NumberField
            label="Stock Cartons"
            name="stock_Cartons"
            value={form.stock_Cartons}
            onChange={handleChange}
            step="1"
          />

          <div>
            <label className="block mb-2 font-medium">
              Status
            </label>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            >
              <option value="ACTIVE">
                Active
              </option>

              <option value="INACTIVE">
                Inactive
              </option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Product Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="w-full border rounded-lg px-4 py-3"
            />

            {preview && (
              <img
                src={preview}
                alt="Product preview"
                className="mt-4 h-32 w-32 object-cover rounded-xl border"
              />
            )}
          </div>

        </div>

        <div className="flex justify-end gap-3 mt-8">

          <button
            type="button"
            onClick={() =>
              navigate("/dashboard/products")
            }
            className="px-5 py-3 border rounded-lg"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-lg bg-orange-500 text-white disabled:opacity-60"
          >
            {loading
              ? "Saving..."
              : isEditMode
                ? "Update Product"
                : "Save Product"}
          </button>

        </div>

      </form>
    </div>
  );
}

function NumberField({
  label,
  name,
  value,
  onChange,
  step = "0.01"
}) {

  return (
    <div>
      <label className="block mb-2 font-medium">
        {label} *
      </label>

      <input
        type="number"
        min="0"
        step={step}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border rounded-lg px-4 py-3"
        placeholder={`Enter ${label}`}
      />
    </div>
  );
}