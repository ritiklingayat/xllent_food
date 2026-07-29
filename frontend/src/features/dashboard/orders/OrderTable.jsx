import React, { useMemo, useState } from "react";

import {
  Eye,
  Pencil,
  Trash2,
  Search,
  Package,
  Calendar,
} from "lucide-react";

const STATUS_COLORS = {
  PENDING: "bg-yellow-100 text-yellow-700",
  CONFIRMED: "bg-blue-100 text-blue-700",
  PROCESSING: "bg-indigo-100 text-indigo-700",
  SHIPPED: "bg-purple-100 text-purple-700",
  DELIVERED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
};

export default function OrderTable({
  orders = [],
  onView,
  onEdit,
  onDelete,
}) {
  const [search, setSearch] = useState("");

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const keyword = search.toLowerCase();

      return (
        order.id?.toLowerCase().includes(keyword) ||
        order.customerName?.toLowerCase().includes(keyword) ||
        order.salesPerson?.toLowerCase().includes(keyword)
      );
    });
  }, [orders, search]);

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">

      {/* Header */}

      <div className="p-6 border-b bg-gradient-to-r from-orange-500 to-red-500">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

          <div>

            <h2 className="text-2xl font-bold text-white">
              Orders
            </h2>

            <p className="text-orange-100">
              Total Orders : {filteredOrders.length}
            </p>

          </div>

          <div className="relative w-full lg:w-96">

            <Search
              className="absolute left-4 top-3 text-gray-400"
              size={18}
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Order / Customer / Sales Person"
              className="
              w-full
              bg-white
              rounded-xl
              pl-11
              pr-4
              py-3
              outline-none
              "
            />

          </div>

        </div>

      </div>

      {/* Desktop */}

      <div className="hidden lg:block overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="bg-slate-100">

              <th className="text-left p-4">Order ID</th>

              <th className="text-left p-4">Customer</th>

              <th className="text-left p-4">Items</th>

              <th className="text-left p-4">Amount</th>

              <th className="text-left p-4">Status</th>

              <th className="text-left p-4">Created</th>

              <th className="text-center p-4">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>
            {filteredOrders.length > 0 ? (

  filteredOrders.map((order) => (

    <tr
      key={order.id}
      className="
      border-b
      hover:bg-orange-50
      transition-colors
      "
    >

      {/* Order ID */}

      <td className="p-4">

        <div className="font-bold text-slate-800">
          {order.id}
        </div>

      </td>





      {/* Customer */}

      <td className="p-4">

        <div className="font-semibold">
          {order.customerName}
        </div>

        <div className="text-sm text-slate-500">
          {order.customerType || "-"}
        </div>

      </td>





      {/* Items */}

      <td className="p-4">

        <div className="flex items-center gap-2">

          <Package
            size={18}
            className="text-orange-500"
          />

          <span>

            {order.items?.length || 0}

            {" "}Items

          </span>

        </div>

      </td>







      {/* Amount */}

      <td className="p-4">

        <div className="font-bold text-green-600">

          ₹

          {Number(

            order.subtotal || 0

          ).toLocaleString()}

        </div>

      </td>








      {/* Status */}

      <td className="p-4">

        <span
          className={`
          px-3
          py-1
          rounded-full
          text-xs
          font-semibold

          ${

          STATUS_COLORS[
            order.status
          ] ||

          "bg-slate-100 text-slate-700"

          }
          `}
        >

          {order.status}

        </span>

      </td>








      {/* Date */}

      <td className="p-4">

        <div className="flex items-center gap-2">

          <Calendar
            size={16}
            className="text-slate-400"
          />

          <span>

            {

            order.createdAt

            ?

            new Date(

              order.createdAt

            ).toLocaleDateString()

            :

            "-"

            }

          </span>

        </div>

      </td>








      {/* Actions */}

      <td className="p-4">

        <div className="flex justify-center gap-2">

          <button

            onClick={()=>

              onView?.(order)

            }

            className="
            p-2
            rounded-lg
            bg-blue-100
            hover:bg-blue-200
            "

          >

            <Eye size={18}/>

          </button>





          <button

            onClick={()=>

              onEdit?.(order)

            }

            className="
            p-2
            rounded-lg
            bg-yellow-100
            hover:bg-yellow-200
            "

          >

            <Pencil size={18}/>

          </button>






          <button

            onClick={()=>

              onDelete?.(order)

            }

            className="
            p-2
            rounded-lg
            bg-red-100
            hover:bg-red-200
            "

          >

            <Trash2 size={18}/>

          </button>

        </div>

      </td>

    </tr>

  ))

) : (

  <tr>

    <td
      colSpan={7}
      className="
      text-center
      py-20
      text-slate-500
      "
    >

      <Package
        size={40}
        className="
        mx-auto
        mb-4
        text-slate-300
        "
      />

      <h3 className="text-lg font-semibold">

        No Orders Found

      </h3>

      <p>

        Create your first customer order.

      </p>

    </td>

  </tr>

)}
          </tbody>

        </table>

      </div>






      {/* ===========================
          MOBILE VIEW
      =========================== */}

      <div className="lg:hidden divide-y">

        {

        filteredOrders.length > 0

        ?

        filteredOrders.map((order)=>(

          <div

            key={order.id}

            className="p-5"

          >

            <div className="flex justify-between items-start">

              <div>

                <h3 className="font-bold text-lg">

                  {order.customerName}

                </h3>

                <p className="text-sm text-slate-500">

                  {order.id}

                </p>

              </div>





              <span

                className={`

                px-3

                py-1

                rounded-full

                text-xs

                font-semibold

                ${

                STATUS_COLORS[

                order.status

                ]

                ||

                "bg-slate-100 text-slate-700"

                }

                `}

              >

                {order.status}

              </span>

            </div>







            <div className="grid grid-cols-2 gap-4 mt-5">

              <div>

                <p className="text-xs text-slate-500">

                  Items

                </p>

                <p className="font-semibold">

                  {order.items?.length || 0}

                </p>

              </div>





              <div>

                <p className="text-xs text-slate-500">

                  Amount

                </p>

                <p className="font-bold text-green-600">

                  ₹

                  {Number(

                    order.subtotal || 0

                  ).toLocaleString()}

                </p>

              </div>





              <div>

                <p className="text-xs text-slate-500">

                  Sales Person

                </p>

                <p>

                  {order.salesPerson || "-"}

                </p>

              </div>





              <div>

                <p className="text-xs text-slate-500">

                  Date

                </p>

                <p>

                  {

                  order.createdAt

                  ?

                  new Date(

                    order.createdAt

                  ).toLocaleDateString()

                  :

                  "-"

                  }

                </p>

              </div>

            </div>







            <div className="flex gap-3 mt-6">

              <button

                onClick={()=>

                  onView?.(order)

                }

                className="

                flex-1

                py-3

                rounded-xl

                bg-blue-100

                text-blue-700

                font-semibold

                "

              >

                View

              </button>






              <button

                onClick={()=>

                  onEdit?.(order)

                }

                className="

                flex-1

                py-3

                rounded-xl

                bg-yellow-100

                text-yellow-700

                font-semibold

                "

              >

                Edit

              </button>






              <button

                onClick={()=>

                  onDelete?.(order)

                }

                className="

                flex-1

                py-3

                rounded-xl

                bg-red-100

                text-red-700

                font-semibold

                "

              >

                Delete

              </button>

            </div>

          </div>

        ))

        :

        (

          <div className="text-center py-16">

            <Package

              size={44}

              className="mx-auto text-slate-300"

            />

            <h3 className="mt-4 text-lg font-bold">

              No Orders Found

            </h3>

            <p className="text-slate-500 mt-2">

              Create your first order to get started.

            </p>

          </div>

        )

        }

      </div>

    </div>

  );

}
 