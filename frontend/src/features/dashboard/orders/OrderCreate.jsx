import React, {
  useEffect,
  useMemo,
  useState
} from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import {
  ArrowLeft,
  Save,
  ShoppingCart,
  User,
  Package,
  Search,
  Plus
} from "lucide-react";

import CustomerSelector from "./components/CustomerSelector";
import ProductSelector from "./components/ProductSelector";
import OrderSummary from "./components/OrderSummary";

import {
  getCustomers
} from "@/features/dashboard/customers/utils/customerStorage";

import {
  getProducts
} from "@/features/dashboard/products/utils/productStorage";

import {
  getOrders,
  saveOrders
} from "./utils/orderStorage";

import {
  reduceStock
} from "./utils/inventoryUpdate";

const defaultOrder = {
  id: "",
  customerId: "",
  customerName: "",
  customerType: "",
  salesPerson: "",
  status: "PENDING",
  paymentStatus: "UNPAID",
  paymentMethod: "CREDIT",
  remarks: "",
  items: [],
  subtotal: 0,
  gstAmount: 0,
  discount: 0,
  grandTotal: 0,
  createdAt: "",
  updatedAt: ""
};

export default function OrderCreate() {

  const navigate = useNavigate();

  const { id } = useParams();

  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(false);

  const [saving, setSaving] = useState(false);

  const [customers, setCustomers] = useState([]);

  const [products, setProducts] = useState([]);

  const [order, setOrder] = useState(defaultOrder);

  const [cart, setCart] = useState([]);

  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [search, setSearch] = useState("");

  const [errors, setErrors] = useState({});

  /*
  ==========================================
  LOAD INITIAL DATA
  ==========================================
  */

  useEffect(() => {

    try {

      const customerData = getCustomers() || [];

      const productData = getProducts() || [];

      setCustomers(customerData);

      setProducts(productData);

      if (isEdit) {

        const existingOrders = getOrders();

        const existingOrder = existingOrders.find(
          item => String(item.id) === String(id)
        );

        if (existingOrder) {

          setOrder(existingOrder);

          setCart(existingOrder.items || []);

          const customer = customerData.find(
            item => item.id === existingOrder.customerId
          );

          if (customer) {
            setSelectedCustomer(customer);
          }

        }

      }

    } catch (error) {

      console.error(
        "Order initialization failed",
        error
      );

    }

  }, [id, isEdit]);

  /*
  ==========================================
  ORDER TOTALS
  ==========================================
  */

  const totals = useMemo(() => {

    const subtotal = cart.reduce(
      (sum, item) =>
        sum + Number(item.total || 0),
      0
    );

    const gstAmount = Number(
      ((subtotal * 18) / 100).toFixed(2)
    );

    const discount = Number(
      order.discount || 0
    );

    const grandTotal =
      subtotal +
      gstAmount -
      discount;

    return {

      subtotal,

      gstAmount,

      discount,

      grandTotal

    };

  }, [cart, order.discount]);

  /*
  ==========================================
  GENERIC FIELD CHANGE
  ==========================================
  */

  const handleChange = (name, value) => {

    setOrder(prev => ({

      ...prev,

      [name]: value

    }));

  };

  /*
  =========================================
  CUSTOMER SELECT
  =========================================
  */

  const handleCustomerChange = (customerId) => {

    const customer = customers.find(
      item => String(item.id) === String(customerId)
    );

    if (!customer) return;

    setSelectedCustomer(customer);

    setOrder(prev => ({
      ...prev,
      customerId: customer.id,
      customerName: customer.shopName,
      customerType: customer.shopType || "",
      salesPerson: customer.salesOfficer || ""
    }));

  };

  /*
  =========================================
  PRODUCT SEARCH
  =========================================
  */

  const filteredProducts = useMemo(() => {

    if (!search.trim()) return products;

    return products.filter(product => {

      const keyword = search.toLowerCase();

      return (

        product.productName
          ?.toLowerCase()
          .includes(keyword)

        ||

        product.categoryName
          ?.toLowerCase()
          .includes(keyword)

      );

    });

  }, [products, search]);

  /*
  =========================================
  GET PRODUCT PRICE
  =========================================
  */

  const getProductPrice = (product) => {

    if (!selectedCustomer)
      return Number(product.shopPrice || 0);

    switch (selectedCustomer.shopType) {

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
  =========================================
  ADD PRODUCT
  =========================================
  */

  const addProduct = (product) => {

    if (!selectedCustomer) {

      alert(
        "Please select customer first."
      );

      return;

    }

    const existing = cart.find(
      item => String(item.productId) === String(product.id)
    );

    if (existing) {

      setCart(prev =>
        prev.map(item => {

          if (
            String(item.productId) !==
            String(product.id)
          ) return item;

          const quantity =
            item.quantity + 1;

          return {

            ...item,

            quantity,

            total:
              quantity * item.price

          };

        })
      );

      return;

    }

    const price = getProductPrice(product);

    const unit =

      selectedCustomer.shopType ===
      "RETAILER"

        ? "PACKET"

        : "CARTON";

    setCart(prev => [

      ...prev,

      {

        productId: product.id,

        productName: product.productName,

        categoryName:
          product.categoryName || "",

        image:
          product.image || "",

        unit,

        quantity: 1,

        price,

        total: price,

        stock:
          Number(product.stock || 0)

      }

    ]);

  };

  /*
  =========================================
  REMOVE PRODUCT
  =========================================
  */

  const removeProduct = (productId) => {

    setCart(prev =>
      prev.filter(
        item =>
          String(item.productId) !==
          String(productId)
      )
    );

  };

  /*
  =========================================
  UPDATE QUANTITY
  =========================================
  */

  const updateQuantity = (
    productId,
    quantity
  ) => {

    if (quantity <= 0) return;

    setCart(prev =>
      prev.map(item => {

        if (
          String(item.productId) !==
          String(productId)
        )
          return item;

        return {

          ...item,

          quantity,

          total:
            quantity * item.price

        };

      })
    );

  };

  /*
  =========================================
  VALIDATE ORDER
  =========================================
  */

  const validateOrder = (currentCart, currentOrder) => {

    const newErrors = {};

    if (!currentOrder.customerId) {
      newErrors.customer = "Please select a customer.";
    }

    if (currentCart.length === 0) {
      newErrors.cart = "Please add at least one product.";
    }

    for (const item of currentCart) {

      if (item.quantity <= 0) {
        newErrors.cart = "Invalid quantity.";
        break;
      }

      if (item.quantity > item.stock) {
        newErrors.cart =
          `${item.productName} has only ${item.stock} in stock.`;
        break;
      }

    }

    setErrors(newErrors);

    return newErrors;

  };

  /*
  =========================================
  SAVE ORDER
  =========================================
  */

  const handleSubmit = () => {

    const validationErrors = validateOrder(cart, order);

    if (Object.keys(validationErrors).length > 0) {

      const message = Object.values(validationErrors)[0];

      if (message) {
        alert(message);
      }

      return;

    }

    setSaving(true);

    try {

      const allOrders = getOrders() || [];

      const finalOrder = {

        ...order,

        id: isEdit
          ? order.id
          : `ORD-${Date.now()}`,

        items: cart,

        subtotal: totals.subtotal,

        gstAmount: totals.gstAmount,

        discount: totals.discount,

        grandTotal: totals.grandTotal,

        updatedAt: new Date().toISOString(),

        createdAt: isEdit
          ? order.createdAt
          : new Date().toISOString()

      };

      let updatedOrders;

      if (isEdit) {

        updatedOrders = allOrders.map(item =>

          String(item.id) === String(order.id)

            ? finalOrder

            : item

        );

      } else {

        updatedOrders = [

          ...allOrders,

          finalOrder

        ];

        reduceStock(cart);

      }

      saveOrders(updatedOrders);

      alert(
        isEdit
          ? "Order Updated Successfully"
          : "Order Created Successfully"
      );

      navigate("/dashboard/orders");

    }

    catch (error) {

      console.error(error);

      alert("Unable to save order.");

    }

    finally {

      setSaving(false);

    }

  };

  return (

    <div className="min-h-screen bg-slate-50 p-6">

      <div className="max-w-7xl mx-auto">

        {/* ===============================
                PAGE HEADER
        ================================ */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">

          <div>

            <h1 className="text-4xl font-black text-slate-800">

              {

                isEdit

                  ?

                  "Edit Order"

                  :

                  "Create Order"

              }

            </h1>

            <p className="text-slate-500 mt-2">

              Create customer orders and update inventory automatically.

            </p>

          </div>

          <div className="flex gap-3">

            <button

              onClick={() => navigate(-1)}

              className="

                flex

                items-center

                gap-2

                px-5

                py-3

                rounded-xl

                border

                bg-white

                hover:bg-slate-100

              "

            >

              <ArrowLeft size={18} />

              Back

            </button>

          </div>

        </div>

        <div className="grid xl:grid-cols-3 gap-8">

          {/* ======================================
                  LEFT SIDE
          ====================================== */}

          <div className="xl:col-span-2 space-y-8">

            {/* CUSTOMER */}

            <div className="bg-white rounded-3xl shadow p-6">

              <h2 className="text-xl font-bold mb-5">

                Customer Information

              </h2>

              <CustomerSelector

                customers={customers}

                value={order.customerId}

                onChange={handleCustomerChange}

              />

            </div>

            {/* PRODUCTS */}

            <div className="bg-white rounded-3xl shadow p-6">

              <div className="flex justify-between items-center mb-5">

                <h2 className="text-xl font-bold">

                  Products

                </h2>

                <span className="text-slate-500">

                  {

                    filteredProducts.length

                  }

                  Products

                </span>

              </div>

              <div className="relative mb-6">

                <Search

                  size={18}

                  className="

                    absolute

                    left-4

                    top-4

                    text-slate-400

                  "

                />

                <input

                  value={search}

                  onChange={(e) =>

                    setSearch(e.target.value)

                  }

                  placeholder="Search products..."

                  className="

                    w-full

                    pl-11

                    pr-4

                    py-3

                    rounded-xl

                    border

                    outline-none

                    focus:ring-2

                    focus:ring-orange-400

                  "

                />

              </div>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">

                {

                  filteredProducts.map(product => (

                    <div

                      key={product.id}

                      className="

                        border

                        rounded-2xl

                        p-4

                        hover:border-orange-400

                        hover:shadow-lg

                        transition

                      "

                    >

                      <img

                        src={

                          product.image ||

                          "https://placehold.co/400x300"

                        }

                        alt={product.productName}

                        className="

                          w-full

                          h-40

                          rounded-xl

                          object-cover

                          mb-4

                        "

                      />

                      <h3 className="font-bold">

                        {product.productName}

                      </h3>

                      <p className="text-sm text-slate-500">

                        {product.categoryName}

                      </p>

                      <div className="mt-3">

                        <p className="text-orange-600 font-bold">

                          ₹ {getProductPrice(product)}

                        </p>

                      </div>

                      <button

                        onClick={() => addProduct(product)}

                        className="

                          mt-4

                          w-full

                          flex

                          items-center

                          justify-center

                          gap-2

                          bg-orange-500

                          hover:bg-orange-600

                          text-white

                          py-3

                          rounded-xl

                          font-semibold

                        "

                      >

                        <Plus size={18} />

                        Add Product

                      </button>

                    </div>

                  ))

                }

              </div>

            </div>

            {/* ======================================
                    SHOPPING CART
            ====================================== */}

            <div className="bg-white rounded-3xl shadow p-6">

              <div className="flex items-center justify-between mb-6">

                <h2 className="text-xl font-bold flex items-center gap-2">

                  <ShoppingCart size={22} />

                  Shopping Cart

                </h2>

                <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-semibold">

                  {cart.length} Items

                </span>

              </div>

              {

                cart.length === 0

                  ?

                  (

                    <div className="text-center py-16">

                      <div className="text-6xl mb-4">

                        🛒

                      </div>

                      <h3 className="text-2xl font-bold">

                        Your Cart is Empty

                      </h3>

                      <p className="text-slate-500 mt-2">

                        Select products above to create an order.

                      </p>

                    </div>

                  )

                  :

                  (

                    <div className="overflow-x-auto">

                      <table className="min-w-full">

                        <thead>

                          <tr className="border-b">

                            <th className="text-left py-3">Product</th>

                            <th className="text-center py-3">Price</th>

                            <th className="text-center py-3">Qty</th>

                            <th className="text-center py-3">Unit</th>

                            <th className="text-center py-3">Total</th>

                            <th className="text-center py-3">Action</th>

                          </tr>

                        </thead>

                        <tbody>

                          {

                            cart.map(item => (

                              <tr

                                key={item.productId}

                                className="border-b hover:bg-slate-50"

                              >

                                <td className="py-4">

                                  <div className="flex items-center gap-3">

                                    <img

                                      src={

                                        item.image ||

                                        "https://placehold.co/80x80"

                                      }

                                      alt={item.productName}

                                      className="w-14 h-14 rounded-xl object-cover"

                                    />

                                    <div>

                                      <p className="font-semibold">

                                        {item.productName}

                                      </p>

                                      <p className="text-sm text-slate-500">

                                        {item.categoryName}

                                      </p>

                                    </div>

                                  </div>

                                </td>

                                <td className="text-center font-semibold">

                                  ₹ {item.price}

                                </td>

                                <td>

                                  <div className="flex items-center justify-center gap-2">

                                    <button

                                      onClick={() =>

                                        updateQuantity(

                                          item.productId,

                                          Math.max(1, item.quantity - 1)

                                        )

                                      }

                                      className="w-8 h-8 rounded-lg bg-slate-200 hover:bg-slate-300"

                                    >

                                      -

                                    </button>

                                    <span className="font-semibold w-8 text-center">

                                      {item.quantity}

                                    </span>

                                    <button

                                      onClick={() =>

                                        updateQuantity(

                                          item.productId,

                                          item.quantity + 1

                                        )

                                      }

                                      className="w-8 h-8 rounded-lg bg-orange-500 text-white hover:bg-orange-600"

                                    >

                                      +

                                    </button>

                                  </div>

                                </td>

                                <td className="text-center">

                                  {item.unit}

                                </td>

                                <td className="text-center font-bold text-green-600">

                                  ₹ {item.total}

                                </td>

                                <td className="text-center">

                                  <button

                                    onClick={() =>

                                      removeProduct(item.productId)

                                    }

                                    className="text-red-500 hover:text-red-700"

                                  >

                                    🗑

                                  </button>

                                </td>

                              </tr>

                            ))

                          }

                        </tbody>

                      </table>

                    </div>

                  )

              }

            </div>

          </div>

          {/* ======================================
                  RIGHT SIDEBAR
          ====================================== */}

          <div className="space-y-6">

            {/* ======================================
                    ORDER SUMMARY
            ====================================== */}

            <div className="bg-white rounded-3xl shadow-lg p-6 sticky top-6">

              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">

                <Package size={22} />

                Order Summary

              </h2>

              <div className="space-y-4">

                <div className="flex justify-between text-slate-600">

                  <span>Total Products</span>

                  <span className="font-semibold">

                    {cart.length}

                  </span>

                </div>

                <div className="flex justify-between text-slate-600">

                  <span>Total Quantity</span>

                  <span className="font-semibold">

                    {cart.reduce(

                      (sum, item) => sum + Number(item.quantity || 0),

                      0

                    )}

                  </span>

                </div>

                <hr />

                <div className="flex justify-between">

                  <span>Subtotal</span>

                  <span className="font-semibold">

                    ₹ {totals.subtotal.toFixed(2)}

                  </span>

                </div>

                <div className="flex justify-between">

                  <span>GST (18%)</span>

                  <span className="font-semibold text-blue-600">

                    ₹ {totals.gstAmount.toFixed(2)}

                  </span>

                </div>

                <div className="space-y-2">

                  <label className="text-sm font-medium">

                    Discount

                  </label>

                  <input

                    type="number"

                    min="0"

                    value={order.discount}

                    onChange={(e) =>

                      handleChange(

                        "discount",

                        Number(e.target.value || 0)

                      )

                    }

                    placeholder="Enter discount"

                    className="

                      w-full

                      border

                      rounded-xl

                      p-3

                      focus:ring-2

                      focus:ring-orange-400

                      outline-none

                    "

                  />

                </div>

                <hr />

                <div className="flex justify-between items-center">

                  <span className="text-xl font-bold">

                    Grand Total

                  </span>

                  <span className="text-3xl font-black text-green-600">

                    ₹ {totals.grandTotal.toFixed(2)}

                  </span>

                </div>

              </div>

            </div>

            {/* ======================================
                  PAYMENT DETAILS
            ====================================== */}

            <div className="bg-white rounded-3xl shadow-lg p-6">

              <h2 className="text-xl font-bold mb-6">

                Payment Information

              </h2>

              <div className="space-y-5">

                <div>

                  <label className="block text-sm font-semibold mb-2">

                    Payment Method

                  </label>

                  <select

                    value={order.paymentMethod}

                    onChange={(e) =>

                      handleChange(

                        "paymentMethod",

                        e.target.value

                      )

                    }

                    className="

                      w-full

                      border

                      rounded-xl

                      p-3

                      focus:ring-2

                      focus:ring-orange-400

                      outline-none

                    "

                  >

                    <option value="CASH">

                      Cash

                    </option>

                    <option value="UPI">

                      UPI

                    </option>

                    <option value="BANK">

                      Bank Transfer

                    </option>

                    <option value="CREDIT">

                      Credit

                    </option>

                  </select>

                </div>

                <div>

                  <label className="block text-sm font-semibold mb-2">

                    Payment Status

                  </label>

                  <select

                    value={order.paymentStatus}

                    onChange={(e) =>

                      handleChange(

                        "paymentStatus",

                        e.target.value

                      )

                    }

                    className="

                      w-full

                      border

                      rounded-xl

                      p-3

                      focus:ring-2

                      focus:ring-orange-400

                      outline-none

                    "

                  >

                    <option value="UNPAID">

                      Unpaid

                    </option>

                    <option value="PARTIAL">

                      Partially Paid

                    </option>

                    <option value="PAID">

                      Paid

                    </option>

                  </select>

                </div>

              </div>

            </div>

            {/* ======================================
                  REMARKS
            ====================================== */}

            <div className="bg-white rounded-3xl shadow-lg p-6">

              <label className="block text-sm font-semibold mb-2">

                Remarks

              </label>

              <textarea

                rows={4}

                value={order.remarks}

                onChange={(e) =>

                  handleChange(

                    "remarks",

                    e.target.value

                  )

                }

                placeholder="Add delivery instructions or notes..."

                className="

                  w-full

                  border

                  rounded-xl

                  p-3

                  resize-none

                  outline-none

                  focus:ring-2

                  focus:ring-orange-400

                "

              />

            </div>

            {/* ======================================
                  ACTION BUTTONS
            ====================================== */}

            <div className="bg-white rounded-3xl shadow-lg p-6">

              <div className="flex flex-col gap-3">

                <button

                  type="button"

                  disabled={saving}

                  onClick={handleSubmit}

                  className="

                    w-full

                    flex

                    items-center

                    justify-center

                    gap-2

                    bg-orange-500

                    hover:bg-orange-600

                    disabled:bg-orange-300

                    text-white

                    py-4

                    rounded-xl

                    font-bold

                    transition

                  "

                >

                  <Save size={18} />

                  {

                    saving

                      ? "Saving Order..."

                      : (

                        isEdit

                          ? "Update Order"

                          : "Place Order"

                      )

                  }

                </button>

                <button

                  type="button"

                  onClick={() => navigate("/dashboard/orders")}

                  className="

                    w-full

                    py-4

                    rounded-xl

                    border

                    hover:bg-slate-100

                    font-semibold

                    transition

                  "

                >

                  Cancel

                </button>

              </div>

            </div>

          </div>

          {/* END RIGHT SIDEBAR */}

        </div>

        {/* END GRID */}

      </div>

      {/* END CONTAINER */}

    </div>

   

  );

}