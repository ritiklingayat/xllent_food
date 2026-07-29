
import React from "react";

export default function ProductTable({
  products = [],
  onEdit,
  onDelete,
  onStatusChange
}) {
  const formatPrice = (value) => {
    const amount = Number(value || 0);

    return amount.toLocaleString("en-IN", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    });
  };

  const handleStatusChange = (product) => {
    if (typeof onStatusChange === "function") {
      onStatusChange(product);
    }
  };

  const handleEdit = (product) => {
    if (typeof onEdit === "function") {
      onEdit(product);
    }
  };

  const handleDelete = (product) => {
    if (typeof onDelete === "function") {
      onDelete(product);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
      {/* EMPTY STATE */}

      {products.length === 0 && (
        <div className="p-10 text-center">
          <div className="text-5xl mb-4">
            📦
          </div>

          <h3 className="text-xl font-bold text-slate-700">
            No Products Found
          </h3>

          <p className="text-slate-500 mt-2">
            Add your first product to manage inventory.
          </p>
        </div>
      )}

      {/* DESKTOP TABLE */}

      {products.length > 0 && (
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-4 text-left">
                  Image
                </th>

                <th className="p-4 text-left">
                  Product
                </th>

                <th className="p-4 text-left">
                  Category
                </th>

                <th className="p-4 text-left">
                  Pricing
                </th>

                <th className="p-4 text-left">
                  Packaging
                </th>

                <th className="p-4 text-left">
                  Stock
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-left">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-t hover:bg-slate-50 transition"
                >
                  {/* IMAGE */}

                  <td className="p-4">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.productName || "Product"}
                        className="w-14 h-14 rounded-xl object-cover border"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-xl bg-slate-200 flex items-center justify-center">
                        📦
                      </div>
                    )}
                  </td>

                  {/* PRODUCT */}

                  <td className="p-4">
                    <h3 className="font-bold text-slate-800">
                      {product.productName || "Unnamed Product"}
                    </h3>

                    <p className="text-sm text-slate-500 mt-1 max-w-[220px]">
                      {product.description
                        ? product.description.length > 40
                          ? `${product.description.slice(0, 40)}...`
                          : product.description
                        : "No description"}
                    </p>
                  </td>

                  {/* CATEGORY */}

                  <td className="p-4">
                    <span className="inline-block bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold">
                      {product.category || "No Category"}
                    </span>
                  </td>

                  {/* PRICING */}

                  <td className="p-4">
                    <div className="space-y-1 whitespace-nowrap">
                      <p className="font-semibold text-slate-800">
                        MRP: ₹{formatPrice(product.mrp)}
                      </p>

                      <p className="text-sm text-slate-600">
                        Super Stockist: ₹
                        {formatPrice(product.finalSuperStockistPrice )}
                      </p>

                      <p className="text-sm text-slate-600">
                        Distributor: ₹
                        {formatPrice(product.finalDistributorPrice )}
                      </p>

                      <p className="text-sm text-slate-600">
                        Shop: ₹{formatPrice(product.finalShopPrice )}
                      </p>

                      <p className="text-xs text-slate-500">
                        GST: {product.gst ?? 0}%
                      </p>
                    </div>
                  </td>

                  {/* PACKAGING */}

                  <td className="p-4">
                    <div className="space-y-1 whitespace-nowrap">
                      <p className="text-sm text-slate-700">
                        Pieces:{" "}
                        <strong>
                          {product.pieces ?? 0}
                        </strong>
                      </p>

                      <p className="text-sm text-slate-700">
                        Packets:{" "}
                        <strong>
                          {product.packets ?? 0}
                        </strong>
                      </p>
                    </div>
                  </td>

                  {/* STOCK */}

                  <td className="p-4">
                    <span className="font-semibold text-slate-800 whitespace-nowrap">
                      {product.stock_Cartons ?? 0} Cartons
                    </span>
                  </td>

                  {/* STATUS */}

                  <td className="p-4">
                    <button
                      type="button"
                      onClick={() =>
                        handleStatusChange(product)
                      }
                      disabled={
                        typeof onStatusChange !== "function"
                      }
                      className={`px-3 py-1 rounded-full text-sm font-bold whitespace-nowrap ${
                        product.status === "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      } ${
                        typeof onStatusChange === "function"
                          ? "cursor-pointer"
                          : "cursor-default"
                      }`}
                    >
                      {product.status === "ACTIVE"
                        ? "Active"
                        : "Inactive"}
                    </button>
                  </td>

                  {/* ACTIONS */}

                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          handleEdit(product)
                        }
                        className="px-4 py-2 rounded-xl bg-blue-100 text-blue-700 font-semibold hover:bg-blue-200 transition"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(product)
                        }
                        className="px-4 py-2 rounded-xl bg-red-100 text-red-700 font-semibold hover:bg-red-200 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MOBILE CARD VIEW */}

      {products.length > 0 && (
        <div className="md:hidden p-4 space-y-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-2xl p-4 space-y-4"
            >
              {/* PRODUCT HEADER */}

              <div className="flex gap-4 items-center">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.productName || "Product"}
                    className="w-16 h-16 rounded-xl object-cover border"
                  />
                ) : (
                  <div className="w-16 h-16 bg-slate-200 rounded-xl flex items-center justify-center">
                    📦
                  </div>
                )}

                <div className="flex-1">
                  <h3 className="font-bold text-slate-800">
                    {product.productName || "Unnamed Product"}
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    {product.category || "No Category"}
                  </p>
                </div>
              </div>

              {/* DESCRIPTION */}

              {product.description && (
                <p className="text-sm text-slate-600">
                  {product.description.length > 100
                    ? `${product.description.slice(0, 100)}...`
                    : product.description}
                </p>
              )}

              {/* PRICE DETAILS */}

              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl">
                <div>
                  <p className="text-xs text-slate-500">
                    MRP
                  </p>

                  <strong className="text-slate-800">
                    ₹{formatPrice(product.mrp)}
                  </strong>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Shop Price
                  </p>

                  <strong className="text-slate-800">
                    ₹{formatPrice(product.shopPrice)}
                  </strong>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Distributor Price
                  </p>

                  <strong className="text-slate-800">
                    ₹{formatPrice(product.distributorPrice)}
                  </strong>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    GST
                  </p>

                  <strong className="text-slate-800">
                    {product.gst ?? 0}%
                  </strong>
                </div>
              </div>

              {/* STOCK AND PACKAGING */}

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-orange-50 rounded-xl p-2">
                  <p className="text-xs text-slate-500">
                    Pieces
                  </p>

                  <strong>
                    {product.pieces ?? 0}
                  </strong>
                </div>

                <div className="bg-orange-50 rounded-xl p-2">
                  <p className="text-xs text-slate-500">
                    Packets
                  </p>

                  <strong>
                    {product.packets ?? 0}
                  </strong>
                </div>

                <div className="bg-orange-50 rounded-xl p-2">
                  <p className="text-xs text-slate-500">
                    Cartons
                  </p>

                  <strong>
                    {product.stock_Cartons ?? 0}
                  </strong>
                </div>
              </div>

              {/* STATUS */}

              <button
                type="button"
                onClick={() =>
                  handleStatusChange(product)
                }
                disabled={
                  typeof onStatusChange !== "function"
                }
                className={`px-3 py-1 rounded-full text-sm font-bold ${
                  product.status === "ACTIVE"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                } ${
                  typeof onStatusChange === "function"
                    ? "cursor-pointer"
                    : "cursor-default"
                }`}
              >
                {product.status === "ACTIVE"
                  ? "Active"
                  : "Inactive"}
              </button>

              {/* ACTION BUTTONS */}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() =>
                    handleEdit(product)
                  }
                  className="flex-1 bg-blue-100 text-blue-700 py-2 rounded-xl font-semibold hover:bg-blue-200 transition"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleDelete(product)
                  }
                  className="flex-1 bg-red-100 text-red-700 py-2 rounded-xl font-semibold hover:bg-red-200 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

