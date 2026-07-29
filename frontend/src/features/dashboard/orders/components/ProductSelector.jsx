import React, {
  useState,
  useMemo,
  useEffect
} from "react";

import {
  Search,
  Package,
  Filter,
  ArrowUpDown,
  Minus,
  Plus,
  ShoppingCart
} from "lucide-react";

export default function ProductSelector({
  products = [],
  categories = [],
  customerType = "RETAILER",
  onAddProduct
}) {

  /*
  ========================================
  STATE
  ========================================
  */

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [stockFilter, setStockFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("NAME");
  const [quantities, setQuantities] = useState({});

  /*
  ========================================
  RESET FILTERS WHEN PRODUCTS CHANGE
  ========================================
  */

  useEffect(() => {
    if (!products) {
      return;
    }
  }, [products]);

  /*
  ========================================
  PRODUCT FILTERING
  ========================================
  */

  const filteredProducts = useMemo(() => {
    let data = [...products];

    /* Search */
    if (search.trim()) {
      const keyword = search.trim().toLowerCase();
      data = data.filter(product =>
        (product.productName || "")
          .toLowerCase()
          .includes(keyword) ||
        (product.description || "")
          .toLowerCase()
          .includes(keyword)
      );
    }

    /* Category */
    if (selectedCategory !== "ALL") {
      data = data.filter(
        product =>
          String(product.categoryId) ===
          String(selectedCategory)
      );
    }

    /* Stock */
    if (stockFilter === "IN_STOCK") {
      data = data.filter(
        product => Number(product.stock) > 0
      );
    }
    if (stockFilter === "OUT_OF_STOCK") {
      data = data.filter(
        product => Number(product.stock) <= 0
      );
    }

    /* Sorting */
    switch (sortBy) {
      case "PRICE_LOW":
        data.sort(
          (a, b) =>
            Number(a.shopPrice) -
            Number(b.shopPrice)
        );
        break;
      case "PRICE_HIGH":
        data.sort(
          (a, b) =>
            Number(b.shopPrice) -
            Number(a.shopPrice)
        );
        break;
      case "STOCK":
        data.sort(
          (a, b) =>
            Number(b.stock) -
            Number(a.stock)
        );
        break;
      default:
        data.sort(
          (a, b) =>
            (a.productName || "")
              .localeCompare(
                b.productName || ""
              )
        );
    }

    return data;
  }, [
    products,
    search,
    selectedCategory,
    stockFilter,
    sortBy
  ]);

  /*
  ========================================
  PRICE CALCULATION
  ========================================
  */

  const getProductPrice = (product) => {
    switch (customerType) {
      case "SUPER_STOCKIST":
        return Number(
          product.superStockistPrice || 0
        );
      case "DISTRIBUTOR":
        return Number(
          product.distributorPrice || 0
        );
      default:
        return Number(
          product.shopPrice || 0
        );
    }
  };

  /*
  ========================================
  CATEGORY NAME
  ========================================
  */

  const getCategoryName = (id) => {
    const category = categories.find(
      item =>
        String(item.id) ===
        String(id)
    );
    return category ? category.name : "Uncategorized";
  };

  /*
  ========================================
  QUANTITY HELPERS
  ========================================
  */

  const getQuantity = (productId) => {
    return quantities[productId] || 1;
  };

  const increaseQuantity = (product) => {
    setQuantities(prev => ({
      ...prev,
      [product.id]: Math.min(
        Number(product.stock || 0),
        getQuantity(product.id) + 1
      )
    }));
  };

  const decreaseQuantity = (product) => {
    setQuantities(prev => ({
      ...prev,
      [product.id]: Math.max(
        1,
        getQuantity(product.id) - 1
      )
    }));
  };

  const addToCart = (product) => {
    if (Number(product.stock) <= 0) {
      return;
    }
    const quantity = getQuantity(product.id);
    onAddProduct?.({
      ...product,
      quantity,
      price: getProductPrice(product),
      total: getProductPrice(product) * quantity
    });
  };

  /*
  ========================================
  RETURN
  ========================================
  */

  return (
    <div className="space-y-6">

      {/* =====================================
              FILTER TOOLBAR
      ===================================== */}

      <div className="bg-white rounded-3xl shadow-lg p-6">
        <div className="grid lg:grid-cols-4 gap-4">

          {/* SEARCH */}
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-4 text-slate-400"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-11 pr-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* CATEGORY */}
          <div className="relative">
            <Filter
              size={18}
              className="absolute left-4 top-4 text-slate-400"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="ALL">All Categories</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* STOCK */}
          <div>
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="w-full py-3 px-4 border rounded-xl outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="ALL">All Stock</option>
              <option value="IN_STOCK">In Stock</option>
              <option value="OUT_OF_STOCK">Out of Stock</option>
            </select>
          </div>

          {/* SORT */}
          <div className="relative">
            <ArrowUpDown
              size={18}
              className="absolute left-4 top-4 text-slate-400"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="NAME">Sort by Name</option>
              <option value="PRICE_LOW">Price Low → High</option>
              <option value="PRICE_HIGH">Price High → Low</option>
              <option value="STOCK">Highest Stock</option>
            </select>
          </div>

        </div>
      </div>

      {/* =====================================
              PRODUCT GRID
      ===================================== */}

      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-6">
        {filteredProducts.length === 0 ? (
          <div className="col-span-full bg-white rounded-3xl shadow-lg p-16 text-center">
            <Package
              size={60}
              className="mx-auto text-slate-300 mb-5"
            />
            <h3 className="text-xl font-bold">No Products Found</h3>
            <p className="text-slate-500 mt-2">
              Try changing the search or filters.
            </p>
          </div>
        ) : (
          filteredProducts.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-3xl shadow-lg overflow-hidden border border-slate-200 hover:border-orange-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* =====================================
                        PRODUCT IMAGE
                ===================================== */}
                <div className="relative">
                  <img
                    src={
                      product.image ||
                      "https://placehold.co/600x400?text=No+Image"
                    }
                    alt={product.productName}
                    className="w-full h-48 object-cover"
                  />

                  {/* CATEGORY */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur text-xs font-semibold shadow">
                      {getCategoryName(product.categoryId)}
                    </span>
                  </div>

                  {/* STOCK */}
                  <div className="absolute top-3 right-3">
                    {Number(product.stock) > 0 ? (
                      <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">
                        In Stock
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold">
                        Out of Stock
                      </span>
                    )}
                  </div>
                </div>

                {/* =====================================
                        PRODUCT DETAILS
                ===================================== */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-slate-800 line-clamp-1">
                    {product.productName}
                  </h3>
                  <p className="text-sm text-slate-500 mt-2 line-clamp-2 min-h-[40px]">
                    {product.description || "No description available"}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mt-5">
                    <div>
                      <p className="text-xs text-slate-500">MRP</p>
                      <p className="font-semibold">
                        ₹{Number(product.mrp || 0).toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">GST</p>
                      <p className="font-semibold">
                        {product.gst || 0}%
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Available Stock</p>
                      <p className="font-semibold">
                        {product.stock || 0}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Selling Price</p>
                      <p className="text-lg font-bold text-orange-600">
                        ₹{getProductPrice(product).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* =====================================
                      ACTIONS
              ===================================== */}
              <div className="p-5 pt-0 mt-auto">
                <div className="border-t pt-5">
                  <div className="flex items-center justify-between gap-3">
                    
                    {/* QUANTITY */}
                    <div className="flex items-center border rounded-xl overflow-hidden bg-slate-50">
                      <button
                        type="button"
                        onClick={() => decreaseQuantity(product)}
                        className="w-9 h-10 flex items-center justify-center hover:bg-slate-200 transition"
                      >
                        <Minus size={16} />
                      </button>
                      <div className="w-10 text-center font-bold text-sm">
                        {getQuantity(product.id)}
                      </div>
                      <button
                        type="button"
                        onClick={() => increaseQuantity(product)}
                        disabled={Number(product.stock) <= getQuantity(product.id)}
                        className="w-9 h-10 flex items-center justify-center hover:bg-slate-200 disabled:opacity-40 transition"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    {/* ADD TO CART */}
                    <button
                      type="button"
                      disabled={Number(product.stock) <= 0}
                      onClick={() => addToCart(product)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition bg-orange-500 hover:bg-orange-600 text-white disabled:bg-slate-300 disabled:cursor-not-allowed shadow-md"
                    >
                      <ShoppingCart size={18} />
                      {Number(product.stock) > 0 ? "Add" : "Out of Stock"}
                    </button>

                  </div>
                </div>
              </div>

            </div>
          ))
        )}
      </div>

      {/* =====================================
              RESULTS SUMMARY
      ===================================== */}

      <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-800">
              Product Catalogue
            </h3>
            <p className="text-slate-500 text-sm mt-1">
              Browse products and add them to the current order.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="px-5 py-3 rounded-2xl bg-orange-50 border border-orange-200">
              <p className="text-xs text-slate-500">Products Found</p>
              <p className="text-xl font-bold text-orange-600">
                {filteredProducts.length}
              </p>
            </div>
            <div className="px-5 py-3 rounded-2xl bg-green-50 border border-green-200">
              <p className="text-xs text-slate-500">Available</p>
              <p className="text-xl font-bold text-green-600">
                {filteredProducts.filter(p => Number(p.stock) > 0).length}
              </p>
            </div>
            <div className="px-5 py-3 rounded-2xl bg-red-50 border border-red-200">
              <p className="text-xs text-slate-500">Out of Stock</p>
              <p className="text-xl font-bold text-red-600">
                {filteredProducts.filter(p => Number(p.stock) <= 0).length}
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}