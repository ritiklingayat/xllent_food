import {
  Pencil,
  Trash2,
  Loader2,
  FolderOpen,
} from "lucide-react";

export default function CategoryTable({
  categories = [],
  loading = false,
  deletingId = null,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return (
      <div className="flex min-h-72 items-center justify-center rounded-2xl bg-white shadow-sm">
        <Loader2
          size={32}
          className="animate-spin text-blue-600"
        />
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl bg-white px-6 text-center shadow-sm">
        <FolderOpen
          size={48}
          className="mb-4 text-slate-300"
        />

        <h2 className="text-lg font-semibold text-slate-700">
          No categories found
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Create your first category to get
          started.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                ID
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                Category Name
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                Status
              </th>

              <th className="px-6 py-4 text-right text-sm font-semibold text-slate-600">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {categories.map((category) => (
              <tr
                key={category.id}
                className="hover:bg-slate-50"
              >
                <td className="px-6 py-4 text-sm text-slate-500">
                  {category.id}
                </td>

                <td className="px-6 py-4 font-medium text-slate-800">
                  {category.categoryName}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      category.status ===
                      "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {category.status}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        onEdit?.(category)
                      }
                      className="rounded-lg bg-amber-100 p-2 text-amber-700 hover:bg-amber-200"
                      title="Edit category"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      type="button"
                      disabled={
                        deletingId ===
                        category.id
                      }
                      onClick={() =>
                        onDelete?.(category)
                      }
                      className="rounded-lg bg-red-100 p-2 text-red-700 hover:bg-red-200 disabled:cursor-not-allowed disabled:opacity-50"
                      title="Delete category"
                    >
                      {deletingId ===
                      category.id ? (
                        <Loader2
                          size={18}
                          className="animate-spin"
                        />
                      ) : (
                        <Trash2 size={18} />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}