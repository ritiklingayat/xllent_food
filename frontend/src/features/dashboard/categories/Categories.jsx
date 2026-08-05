import { useCallback, useEffect, useState } from "react";
import { Plus, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

import CategoryTable from "./CategoryTable";
import CategoryDrawer from "./CategoryDrawer";

import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "./categoryService";

const emptyForm = {
  categoryName: "",
  status: "ACTIVE",
};

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] =
    useState(null);

  const [drawerOpen, setDrawerOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [deletingId, setDeletingId] =
    useState(null);

  const loadCategories = useCallback(async () => {
    try {
      setLoading(true);

      const response =
        await getAllCategories();

      const list = Array.isArray(response)
        ? response
        : response?.data || [];

      setCategories(list);
    } catch (error) {
      console.error(
        "Load categories error:",
        error
      );

      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Unable to load categories.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const openCreateDrawer = () => {
    setSelectedCategory(null);
    setDrawerOpen(true);
  };

  const openEditDrawer = (category) => {
    setSelectedCategory(category);
    setDrawerOpen(true);
  };

  const closeDrawer = (force = false) => {
    if (saving && !force) {
      return;
    }

    setSelectedCategory(null);
    setDrawerOpen(false);
  };

  const handleSave = async (formData) => {
    const payload = {
      categoryName:
        formData.categoryName.trim(),
      status:
        formData.status || "ACTIVE",
    };

    if (!payload.categoryName) {
      toast.error(
        "Category name is required."
      );
      return;
    }

    try {
      setSaving(true);

      if (selectedCategory?.id) {
        const updated =
          await updateCategory(
            selectedCategory.id,
            payload
          );

        setCategories(
          (previousCategories) =>
            previousCategories.map(
              (category) =>
                category.id ===
                selectedCategory.id
                  ? updated
                  : category
            )
        );

        toast.success(
          "Category updated successfully."
        );
      } else {
        const created =
          await createCategory(payload);

        setCategories(
          (previousCategories) => [
            created,
            ...previousCategories,
          ]
        );

        toast.success(
          "Category created successfully."
        );
      }

      closeDrawer(true);
    } catch (error) {
      console.error(
        "Save category error:",
        error
      );

      const responseData =
        error.response?.data;

      let message =
        "Unable to save category.";

      if (
        typeof responseData === "string"
      ) {
        message = responseData;
      } else if (
        responseData?.message
      ) {
        message = responseData.message;
      } else if (
        responseData?.error
      ) {
        message = responseData.error;
      }

      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (category) => {
    const confirmed =
      window.confirm(
        `Delete category "${category.categoryName}"?`
      );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(category.id);

      await deleteCategory(category.id);

      setCategories(
        (previousCategories) =>
          previousCategories.filter(
            (item) =>
              item.id !== category.id
          )
      );

      toast.success(
        "Category deleted successfully."
      );
    } catch (error) {
      console.error(
        "Delete category error:",
        error
      );

      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Unable to delete category.";

      toast.error(message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Categories
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage product categories.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={loadCategories}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 font-medium text-slate-700 shadow-sm hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw
              size={18}
              className={
                loading
                  ? "animate-spin"
                  : ""
              }
            />

            Refresh
          </button>

          <button
            type="button"
            onClick={openCreateDrawer}
            className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-4 py-2.5 font-semibold text-white shadow hover:bg-orange-600"
          >
            <Plus size={18} />
            Add Category
          </button>
        </div>
      </div>

      <CategoryTable
        categories={categories}
        loading={loading}
        deletingId={deletingId}
        onEdit={openEditDrawer}
        onDelete={handleDelete}
      />

      <CategoryDrawer
        open={drawerOpen}
        category={selectedCategory}
        initialValues={
          selectedCategory || emptyForm
        }
        saving={saving}
        onClose={closeDrawer}
        onSave={handleSave}
      />
    </div>
  );
}
