import { useEffect, useState } from "react";
import {
  X,
  Loader2,
} from "lucide-react";

const emptyForm = {
  categoryName: "",
  status: "ACTIVE",
};

export default function CategoryDrawer({
  open,
  category,
  initialValues,
  saving = false,
  onClose,
  onSave,
}) {
  const isCreating = saving && !category;
  const [form, setForm] =
    useState(emptyForm);

  useEffect(() => {
    if (!open) {
      return;
    }

    setForm({
      categoryName:
        initialValues?.categoryName || "",
      status:
        initialValues?.status || "ACTIVE",
    });
  }, [open, initialValues]);

  if (!open) {
    return null;
  }

  const handleChange = (event) => {
    const { name, value } =
      event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave?.(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50">
      <div className="h-full w-full max-w-md overflow-y-auto bg-white p-6 shadow-2xl">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {category
                ? "Edit Category"
                : "Add Category"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Enter category details below.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 disabled:opacity-50"
          >
            <X size={22} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label
              htmlFor="categoryName"
              className="text-sm font-medium text-slate-700"
            >
              Category Name
            </label>

            <input
              id="categoryName"
              type="text"
              name="categoryName"
              value={form.categoryName}
              onChange={handleChange}
              placeholder="Enter category name"
              disabled={saving}
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:opacity-60"
            />
          </div>

          <div>
            <label
              htmlFor="status"
              className="text-sm font-medium text-slate-700"
            >
              Status
            </label>

            <select
              id="status"
              name="status"
              value={form.status}
              onChange={handleChange}
              disabled={saving}
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:opacity-60"
            >
              <option value="ACTIVE">
                ACTIVE
              </option>

              <option value="INACTIVE">
                INACTIVE
              </option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              aria-busy={saving}
              className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving && (
                <Loader2
                  size={18}
                  className="animate-spin"
                />
              )}

              {saving
                ? isCreating
                  ? "Adding category..."
                  : "Updating category..."
                : category
                  ? "Update Category"
                  : "Add Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
