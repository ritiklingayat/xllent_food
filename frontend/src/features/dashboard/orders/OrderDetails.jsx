import React,{
useEffect,
useMemo,
useState
} from "react";

import{
useNavigate,
useParams
} from "react-router-dom";

import{

ArrowLeft,
Printer,
Download,
Receipt,
Calendar,
User,
Package,
CreditCard,
Truck,
CheckCircle2,
Clock,
XCircle

} from "lucide-react";

import{

getOrders

} from "./utils/orderStorage";

export default function OrderDetails(){

const navigate=useNavigate();

const{id}=useParams();

/*
========================================
STATE
========================================
*/

const[order,setOrder]=useState(null);

const[loading,setLoading]=useState(true);

const[error,setError]=useState("");





/*
========================================
LOAD ORDER
========================================
*/

useEffect(()=>{

try{

const orders=getOrders();

const selectedOrder=

orders.find(

item=>

String(item.id)===String(id)

);

if(!selectedOrder){

setError("Order not found.");

setOrder(null);

}

else{

setOrder(selectedOrder);

}

}

catch(err){

console.error(

"OrderDetails Error",

err

);

setError(

"Unable to load order."

);

}

finally{

setLoading(false);

}

},[id]);






/*
========================================
STATUS BADGE
========================================
*/

const statusConfig={

PENDING:{

label:"Pending",

bg:"bg-yellow-100",

text:"text-yellow-700",

icon:<Clock size={16}/>

},

CONFIRMED:{

label:"Confirmed",

bg:"bg-blue-100",

text:"text-blue-700",

icon:<Package size={16}/>

},

DISPATCHED:{

label:"Dispatched",

bg:"bg-indigo-100",

text:"text-indigo-700",

icon:<Truck size={16}/>

},

DELIVERED:{

label:"Delivered",

bg:"bg-green-100",

text:"text-green-700",

icon:<CheckCircle2 size={16}/>

},

CANCELLED:{

label:"Cancelled",

bg:"bg-red-100",

text:"text-red-700",

icon:<XCircle size={16}/>

}

};

const status=useMemo(()=>{

return(

statusConfig[

order?.status

] ||

statusConfig.PENDING

);

},[order]);






/*
========================================
HELPERS
========================================
*/

const formatCurrency=(value)=>{

return new Intl.NumberFormat(

"en-IN",

{

style:"currency",

currency:"INR",

maximumFractionDigits:2

}

).format(

Number(value||0)

);

};

const formatDate=(value)=>{

if(!value) return "-";

return new Date(value)

.toLocaleString(

"en-IN",

{

day:"2-digit",

month:"short",

year:"numeric",

hour:"2-digit",

minute:"2-digit"

}

);

};





/*
========================================
LOADING
========================================
*/

if(loading){

return(

<div className="

min-h-screen

flex

items-center

justify-center

bg-slate-50

">

<div className="text-center">

<div className="

w-12

h-12

border-4

border-orange-500

border-t-transparent

rounded-full

animate-spin

mx-auto

mb-4

"/>

<p className="text-slate-500">

Loading Order...

</p>

</div>

</div>

);

}





/*
========================================
ERROR
========================================
*/

if(error){

return(

<div className="

min-h-screen

flex

items-center

justify-center

bg-slate-50

p-6

">

<div className="

bg-white

rounded-3xl

shadow-xl

p-10

text-center

max-w-lg

w-full

">

<h2 className="

text-2xl

font-bold

text-red-600

mb-3

">

{error}

</h2>

<p className="text-slate-500 mb-8">

The requested order could not be found or may have been removed.

</p>

<button

type="button"

onClick={()=>

navigate("/dashboard/orders")

}

className="

px-6

py-3

rounded-xl

bg-orange-500

text-white

font-semibold

hover:bg-orange-600

"

>

Back to Orders

</button>

</div>

</div>

);

}
/*
========================================
RETURN
========================================
*/

return(

<div className="

min-h-screen

bg-slate-50

p-6

">

<div className="

max-w-7xl

mx-auto

space-y-6

">

{/* =====================================
        PAGE HEADER
===================================== */}

<div className="

bg-white

rounded-3xl

shadow-lg

p-8

">

<div className="

flex

flex-col

lg:flex-row

lg:items-center

lg:justify-between

gap-6

">

<div>

<div className="

flex

items-center

gap-3

mb-3

">

<div className="

w-14

h-14

rounded-2xl

bg-orange-100

flex

items-center

justify-center

">

<Receipt

size={28}

className="text-orange-600"

/>

</div>

<div>

<h1 className="

text-4xl

font-black

text-slate-800

">

Order Invoice

</h1>

<p className="

text-slate-500

mt-1

">

View complete order details

</p>

</div>

</div>

</div>

{/* ACTION BUTTONS */}

<div className="

flex

flex-wrap

gap-3

">

<button

type="button"

onClick={()=>navigate(-1)}

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

transition

"

>

<ArrowLeft size={18}/>

Back

</button>

<button

type="button"

onClick={()=>window.print()}

className="

flex

items-center

gap-2

px-5

py-3

rounded-xl

border

border-blue-500

text-blue-600

hover:bg-blue-50

transition

"

>

<Printer size={18}/>

Print

</button>

<button

type="button"

onClick={()=>alert("PDF download coming soon")}

className="

flex

items-center

gap-2

px-5

py-3

rounded-xl

bg-orange-500

hover:bg-orange-600

text-white

font-semibold

transition

"

>

<Download size={18}/>

Download Invoice

</button>

</div>

</div>

</div>





{/* =====================================
        ORDER OVERVIEW
===================================== */}

<div className="

grid

grid-cols-1

md:grid-cols-2

xl:grid-cols-4

gap-5

">

{/* ORDER ID */}

<div className="

bg-white

rounded-2xl

shadow

p-6

">

<p className="

text-sm

text-slate-500

">

Order ID

</p>

<h2 className="

text-xl

font-black

mt-2

break-all

">

{order.id}

</h2>

</div>

{/* ORDER DATE */}

<div className="

bg-white

rounded-2xl

shadow

p-6

">

<div className="

flex

items-center

gap-2

mb-2

">

<Calendar

size={18}

className="text-orange-500"

/>

<span className="text-sm text-slate-500">

Order Date

</span>

</div>

<h2 className="font-bold">

{formatDate(order.createdAt)}

</h2>

</div>

{/* STATUS */}

<div className="

bg-white

rounded-2xl

shadow

p-6

">

<p className="

text-sm

text-slate-500

mb-3

">

Status

</p>

<div className="

inline-flex

items-center

gap-2

px-4

py-2

rounded-full

font-semibold

text-sm

${status.bg}

${status.text}

">

{status.icon}

{status.label}

</div>

</div>

{/* GRAND TOTAL */}

<div className="

bg-gradient-to-r

from-orange-500

to-orange-600

rounded-2xl

shadow

p-6

text-white

">

<p className="text-orange-100">

Grand Total

</p>

<h2 className="

text-3xl

font-black

mt-3

">

{

formatCurrency(

order.totals?.grandTotal ??

order.grandTotal ??

0

)

}

</h2>

</div>

</div>
{/* =====================================
        CUSTOMER & PAYMENT INFORMATION
===================================== */}

<div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

  {/* ================= CUSTOMER ================= */}

  <div className="bg-white rounded-3xl shadow-lg p-6">

    <div className="flex items-center gap-3 mb-6">

      <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center">

        <User
          size={22}
          className="text-orange-600"
        />

      </div>

      <div>

        <h2 className="text-xl font-bold">

          Customer Information

        </h2>

        <p className="text-sm text-slate-500">

          Shop & owner details

        </p>

      </div>

    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

      <div>

        <p className="text-xs uppercase text-slate-400">

          Shop Name

        </p>

        <p className="font-semibold mt-1">

          {order.customerName || "-"}

        </p>

      </div>

      <div>

        <p className="text-xs uppercase text-slate-400">

          Owner Name

        </p>

        <p className="font-semibold mt-1">

          {order.customer?.ownerName || "-"}

        </p>

      </div>

      <div>

        <p className="text-xs uppercase text-slate-400">

          Mobile

        </p>

        <p className="font-semibold mt-1">

          {order.customer?.mobile || "-"}

        </p>

      </div>

      <div>

        <p className="text-xs uppercase text-slate-400">

          Shop Type

        </p>

        <span className="inline-flex mt-1 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-sm font-semibold">

          {order.customer?.shopType || "-"}

        </span>

      </div>

    </div>

  </div>





  {/* ================= PAYMENT ================= */}

  <div className="bg-white rounded-3xl shadow-lg p-6">

    <div className="flex items-center gap-3 mb-6">

      <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">

        <CreditCard
          size={22}
          className="text-green-600"
        />

      </div>

      <div>

        <h2 className="text-xl font-bold">

          Payment Details

        </h2>

        <p className="text-sm text-slate-500">

          Payment information

        </p>

      </div>

    </div>

    <div className="space-y-4">

      <div className="flex justify-between">

        <span className="text-slate-500">

          Payment Method

        </span>

        <span className="font-semibold">

          {order.payment?.method || "-"}

        </span>

      </div>

      <div className="flex justify-between">

        <span className="text-slate-500">

          Payment Status

        </span>

        <span className={`

px-3

py-1

rounded-full

text-sm

font-semibold

${
order.payment?.status==="PAID"

?

"bg-green-100 text-green-700"

:

order.payment?.status==="PARTIAL"

?

"bg-yellow-100 text-yellow-700"

:

"bg-red-100 text-red-700"

}

`}>

          {order.payment?.status || "PENDING"}

        </span>

      </div>

      <div className="flex justify-between">

        <span className="text-slate-500">

          Amount

        </span>

        <span className="font-bold text-lg">

          {

formatCurrency(

order.totals?.grandTotal ??

order.grandTotal ??

0

)

}

        </span>

      </div>

    </div>

  </div>

</div>





{/* =====================================
        DELIVERY & SALES INFORMATION
===================================== */}

<div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

  {/* DELIVERY */}

  <div className="bg-white rounded-3xl shadow-lg p-6">

    <div className="flex items-center gap-3 mb-6">

      <Truck
        size={22}
        className="text-blue-600"
      />

      <h2 className="text-xl font-bold">

        Delivery Information

      </h2>

    </div>

    <div className="space-y-4">

      <div>

        <p className="text-xs uppercase text-slate-400">

          Delivery Address

        </p>

        <p className="font-medium mt-1">

          {order.customer?.address || "-"}

        </p>

      </div>

      <div>

        <p className="text-xs uppercase text-slate-400">

          City

        </p>

        <p className="font-medium mt-1">

          {order.customer?.city || "-"}

        </p>

      </div>

      <div>

        <p className="text-xs uppercase text-slate-400">

          PIN Code

        </p>

        <p className="font-medium mt-1">

          {order.customer?.pincode || "-"}

        </p>

      </div>

    </div>

  </div>





  {/* SALES TEAM */}

  <div className="bg-white rounded-3xl shadow-lg p-6">

    <div className="flex items-center gap-3 mb-6">

      <Package
        size={22}
        className="text-purple-600"
      />

      <h2 className="text-xl font-bold">

        Sales Assignment

      </h2>

    </div>

    <div className="space-y-4">

      <div className="flex justify-between">

        <span className="text-slate-500">

          Area Sales Manager

        </span>

        <span className="font-semibold">

          {order.asmName || "-"}

        </span>

      </div>

      <div className="flex justify-between">

        <span className="text-slate-500">

          Sales Officer

        </span>

        <span className="font-semibold">

          {order.soName || "-"}

        </span>

      </div>

    </div>

  </div>

</div>





{/* =====================================
        REMARKS
===================================== */}

<div className="bg-white rounded-3xl shadow-lg p-6">

  <h2 className="text-xl font-bold mb-4">

    Remarks

  </h2>

  <div className="rounded-2xl bg-slate-50 border p-5">

    {

order.remarks

?

(

<p className="leading-7 text-slate-700">

{order.remarks}

</p>

)

:

(

<p className="text-slate-400 italic">

No remarks added for this order.

</p>

)

}

  </div>

</div>
{/* =====================================
        ORDER ITEMS
===================================== */}

<div className="bg-white rounded-3xl shadow-lg overflow-hidden">

  <div className="px-6 py-5 border-b">

    <h2 className="text-xl font-bold">

      Order Items

    </h2>

    <p className="text-sm text-slate-500 mt-1">

      Products included in this order

    </p>

  </div>

  <div className="overflow-x-auto">

    <table className="min-w-full">

      <thead className="bg-slate-100">

        <tr>

          <th className="px-6 py-4 text-left text-xs font-bold uppercase">

            Product

          </th>

          <th className="px-6 py-4 text-center text-xs font-bold uppercase">

            Unit

          </th>

          <th className="px-6 py-4 text-center text-xs font-bold uppercase">

            Qty

          </th>

          <th className="px-6 py-4 text-right text-xs font-bold uppercase">

            Unit Price

          </th>

          <th className="px-6 py-4 text-right text-xs font-bold uppercase">

            GST %

          </th>

          <th className="px-6 py-4 text-right text-xs font-bold uppercase">

            Total

          </th>

        </tr>

      </thead>

      <tbody>

        {

        order.items?.length

        ?

        order.items.map((item,index)=>(

        <tr

          key={item.productId || index}

          className="border-b hover:bg-slate-50 transition"

        >

          {/* PRODUCT */}

          <td className="px-6 py-5">

            <div className="flex items-center gap-4">

              <div className="

              w-14

              h-14

              rounded-xl

              bg-orange-100

              flex

              items-center

              justify-center

              overflow-hidden

              ">

                {

                item.image

                ?

                <img

                  src={item.image}

                  alt={item.productName}

                  className="w-full h-full object-cover"

                />

                :

                <Package

                  size={26}

                  className="text-orange-600"

                />

                }

              </div>

              <div>

                <h4 className="font-semibold">

                  {item.productName}

                </h4>

                <p className="text-sm text-slate-500">

                  SKU: {item.sku || "-"}

                </p>

              </div>

            </div>

          </td>

          {/* UNIT */}

          <td className="px-6 py-5 text-center">

            <span className="

            px-3

            py-1

            rounded-full

            bg-slate-100

            text-sm

            font-medium

            ">

              {item.unit || "-"}

            </span>

          </td>

          {/* QUANTITY */}

          <td className="px-6 py-5 text-center font-semibold">

            {item.quantity}

          </td>

          {/* UNIT PRICE */}

          <td className="px-6 py-5 text-right font-medium">

            {formatCurrency(item.price)}

          </td>

          {/* GST */}

          <td className="px-6 py-5 text-right">

            {item.gst ?? 0}%

          </td>

          {/* TOTAL */}

          <td className="px-6 py-5 text-right font-bold text-orange-600">

            {

            formatCurrency(

            item.total ??

            (item.quantity * item.price)

            )

            }

          </td>

        </tr>

        ))

        :

        (

        <tr>

          <td

            colSpan={6}

            className="

            text-center

            py-12

            text-slate-500

            "

          >

            No products available for this order.

          </td>

        </tr>

        )

        }

      </tbody>

    </table>

  </div>

</div>
{/* =====================================
        FINANCIAL SUMMARY
===================================== */}

<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

  {/* ===============================
      TOTALS
  ================================ */}

  <div className="xl:col-span-2"></div>

  <div className="bg-white rounded-3xl shadow-lg p-6">

    <h2 className="text-xl font-bold mb-6">

      Invoice Summary

    </h2>

    <div className="space-y-4">

      <div className="flex justify-between">

        <span className="text-slate-500">

          Subtotal

        </span>

        <span className="font-semibold">

          {

          formatCurrency(

          order.totals?.subtotal ??

          order.subtotal ??

          0

          )

          }

        </span>

      </div>

      <div className="flex justify-between">

        <span className="text-slate-500">

          GST

          {

          order.totals?.gstPercent

          ?

          ` (${order.totals.gstPercent}%)`

          :

          ""

          }

        </span>

        <span className="font-semibold">

          {

          formatCurrency(

          order.totals?.gstAmount ??

          order.gstAmount ??

          0

          )

          }

        </span>

      </div>

      <div className="flex justify-between">

        <span className="text-slate-500">

          Discount

          {

          order.totals?.discountPercent

          ?

          ` (${order.totals.discountPercent}%)`

          :

          ""

          }

        </span>

        <span className="font-semibold text-red-600">

          -

          {

          formatCurrency(

          order.totals?.discountAmount ??

          order.discountAmount ??

          0

          )

          }

        </span>

      </div>

      <div className="flex justify-between">

        <span className="text-slate-500">

          Shipping

        </span>

        <span className="font-semibold">

          {

          formatCurrency(

          order.shippingCharge ??

          0

          )

          }

        </span>

      </div>

      <hr/>

      <div className="

      flex

      justify-between

      items-center

      rounded-2xl

      bg-orange-50

      border

      border-orange-200

      px-5

      py-4

      ">

        <div>

          <p className="text-sm text-slate-500">

            Grand Total

          </p>

          <p className="text-xs text-slate-400">

            Final Invoice Amount

          </p>

        </div>

        <div className="

        text-3xl

        font-black

        text-orange-600

        ">

          {

          formatCurrency(

          order.totals?.grandTotal ??

          order.grandTotal ??

          0

          )

          }

        </div>

      </div>

    </div>

  </div>

</div>





{/* =====================================
        PAYMENT SUMMARY
===================================== */}

<div className="

bg-white

rounded-3xl

shadow-lg

p-6

">

<h2 className="text-xl font-bold mb-6">

Payment Summary

</h2>

<div className="grid md:grid-cols-3 gap-6">

<div>

<p className="text-xs uppercase text-slate-400">

Payment Method

</p>

<p className="font-semibold mt-2">

{order.payment?.method || "-"}

</p>

</div>

<div>

<p className="text-xs uppercase text-slate-400">

Payment Status

</p>

<p className="font-semibold mt-2">

{order.payment?.status || "PENDING"}

</p>

</div>

<div>

<p className="text-xs uppercase text-slate-400">

Amount Paid

</p>

<p className="font-semibold mt-2">

{

formatCurrency(

order.payment?.amountPaid ??

0

)

}

</p>

</div>

</div>

</div>
{/* =====================================
        ORDER TIMELINE
===================================== */}

<div className="bg-white rounded-3xl shadow-lg p-6">

  <h2 className="text-xl font-bold mb-6">

    Order Timeline

  </h2>

  <div className="space-y-5">

    <div className="flex items-start gap-4">

      <div className="

      w-10

      h-10

      rounded-full

      bg-green-100

      flex

      items-center

      justify-center

      ">

        <CheckCircle2
          size={18}
          className="text-green-600"
        />

      </div>

      <div>

        <h4 className="font-semibold">

          Order Created

        </h4>

        <p className="text-sm text-slate-500">

          {formatDate(order.createdAt)}

        </p>

      </div>

    </div>

    <div className="flex items-start gap-4">

      <div className="

      w-10

      h-10

      rounded-full

      bg-orange-100

      flex

      items-center

      justify-center

      ">

        {status.icon}

      </div>

      <div>

        <h4 className="font-semibold">

          Current Status

        </h4>

        <p className="text-sm text-slate-500">

          {status.label}

        </p>

      </div>

    </div>

  </div>

</div>





{/* =====================================
        ORDER ACTIONS
===================================== */}

<div className="bg-white rounded-3xl shadow-lg p-6">

  <h2 className="text-xl font-bold mb-6">

    Order Actions

  </h2>

  <div className="flex flex-wrap gap-4">

    <button
      type="button"
      className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
      onClick={() => alert("Update Status feature will be connected to backend.")}
    >
      Update Status
    </button>

    <button
      type="button"
      className="px-5 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold transition"
      onClick={() => window.print()}
    >
      Print Invoice
    </button>

    <button
      type="button"
      className="px-5 py-3 rounded-xl border hover:bg-slate-100 transition"
      onClick={() => navigate("/dashboard/orders")}
    >
      Back to Orders
    </button>

  </div>

</div>





{/* =====================================
        COMPANY FOOTER
===================================== */}

<div className="

bg-gradient-to-r

from-orange-500

to-orange-600

rounded-3xl

text-white

shadow-xl

p-8

">

<div className="

flex

flex-col

lg:flex-row

justify-between

gap-8

">

<div>

<h2 className="text-2xl font-black">

Xllent Foods

</h2>

<p className="mt-3 text-orange-100">

Quality food products delivered through an efficient distribution network.

</p>

</div>

<div className="text-right">

<p className="text-orange-100">

Generated On

</p>

<p className="font-bold">

{formatDate(new Date())}

</p>

</div>

</div>

<hr className="my-6 border-orange-400"/>

<div className="

flex

flex-col

md:flex-row

justify-between

items-center

gap-3

text-sm

text-orange-100

">

<p>

This invoice is computer generated.

</p>

<p>

© {new Date().getFullYear()} Xllent Foods. All Rights Reserved.

</p>

</div>

</div>

</div>

</div>

);

}