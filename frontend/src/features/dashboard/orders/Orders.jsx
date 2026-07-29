import React,{
useEffect,
useMemo,
useState,
useCallback
} from "react";

import {useNavigate} from "react-router-dom";

import{

ShoppingCart,
Clock,
CheckCircle2,
Truck,
Package,
Search,
RefreshCw

} from "lucide-react";

import OrderTable from "./OrderTable";

import {getOrders} from "./utils/orderStorage";

export default function Orders(){

const navigate=useNavigate();

/*
========================================
STATE
========================================
*/

const[orders,setOrders]=useState([]);

const[loading,setLoading]=useState(true);

const[search,setSearch]=useState("");

const[statusFilter,setStatusFilter]=useState("ALL");

const[dateFilter,setDateFilter]=useState("ALL");





/*
========================================
LOAD ORDERS
========================================
*/

const loadOrders=useCallback(()=>{

setLoading(true);

try{

const data=getOrders();

setOrders(Array.isArray(data)?data:[]);

}

catch(error){

console.error("Order Load Error",error);

setOrders([]);

}

finally{

setLoading(false);

}

},[]);





/*
========================================
INITIAL LOAD
========================================
*/

useEffect(()=>{

loadOrders();

},[loadOrders]);





/*
========================================
LIVE UPDATES
========================================
*/

useEffect(()=>{

window.addEventListener(

"ordersUpdated",

loadOrders

);

return()=>{

window.removeEventListener(

"ordersUpdated",

loadOrders

);

};

},[loadOrders]);





/*
========================================
FILTERED ORDERS
========================================
*/

const filteredOrders=useMemo(()=>{

let data=[...orders];



/* SEARCH */

if(search.trim()){

const keyword=

search

.trim()

.toLowerCase();

data=data.filter(order=>

(order.id||"")

.toLowerCase()

.includes(keyword)

||

(order.customerName||"")

.toLowerCase()

.includes(keyword)

);

}



/* STATUS */

if(statusFilter!=="ALL"){

data=data.filter(order=>

String(order.status)

===

statusFilter

);

}



/* DATE */

if(dateFilter!=="ALL"){

const today=new Date();

data=data.filter(order=>{

const orderDate=

new Date(order.createdAt);

const diff=

(today-orderDate)

/(1000*60*60*24);

switch(dateFilter){

case"TODAY":

return diff<1;

case"7_DAYS":

return diff<=7;

case"30_DAYS":

return diff<=30;

default:

return true;

}

});

}

return data;

},[

orders,

search,

statusFilter,

dateFilter

]);





/*
========================================
STATISTICS
========================================
*/

const stats=useMemo(()=>{

const totalOrders=orders.length;

const pending=

orders.filter(

o=>o.status==="PENDING"

).length;

const delivered=

orders.filter(

o=>o.status==="DELIVERED"

).length;

const dispatched=

orders.filter(

o=>o.status==="DISPATCHED"

).length;

const revenue=

orders.reduce(

(sum,order)=>

sum+

Number(

order.totals?.grandTotal ||

order.grandTotal ||

0

),

0

);

return{

totalOrders,

pending,

delivered,

dispatched,

revenue

};

},[orders]);
/*
========================================
RETURN
========================================
*/

return(

<div className="min-h-screen bg-slate-50 p-6">

{/* =====================================
        PAGE HEADER
===================================== */}

<div className="

flex

flex-col

lg:flex-row

lg:items-center

lg:justify-between

gap-6

mb-8

">

<div>

<h1 className="

text-4xl

font-black

text-slate-800

">

Orders

</h1>

<p className="

text-slate-500

mt-2

">

Manage customer orders, dispatches and sales.

</p>

</div>

<div className="flex gap-3">

<button

type="button"

onClick={loadOrders}

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

<RefreshCw size={18}/>

Refresh

</button>

<button

type="button"

onClick={()=>

navigate("/dashboard/orders/create")

}

className="

flex

items-center

gap-2

px-6

py-3

rounded-xl

bg-orange-500

hover:bg-orange-600

text-white

font-semibold

transition

"

>

<ShoppingCart size={18}/>

Create Order

</button>

</div>

</div>





{/* =====================================
        STATISTICS
===================================== */}

<div className="

grid

grid-cols-1

md:grid-cols-2

xl:grid-cols-5

gap-5

mb-8

">

<div className="bg-white rounded-2xl shadow p-5">

<div className="flex items-center justify-between">

<div>

<p className="text-slate-500 text-sm">

Total Orders

</p>

<h2 className="text-3xl font-black mt-2">

{stats.totalOrders}

</h2>

</div>

<Package

size={34}

className="text-orange-500"

/>

</div>

</div>

<div className="bg-white rounded-2xl shadow p-5">

<div className="flex items-center justify-between">

<div>

<p className="text-slate-500 text-sm">

Pending

</p>

<h2 className="text-3xl font-black mt-2 text-yellow-600">

{stats.pending}

</h2>

</div>

<Clock

size={34}

className="text-yellow-500"

/>

</div>

</div>

<div className="bg-white rounded-2xl shadow p-5">

<div className="flex items-center justify-between">

<div>

<p className="text-slate-500 text-sm">

Dispatched

</p>

<h2 className="text-3xl font-black mt-2 text-blue-600">

{stats.dispatched}

</h2>

</div>

<Truck

size={34}

className="text-blue-500"

/>

</div>

</div>

<div className="bg-white rounded-2xl shadow p-5">

<div className="flex items-center justify-between">

<div>

<p className="text-slate-500 text-sm">

Delivered

</p>

<h2 className="text-3xl font-black mt-2 text-green-600">

{stats.delivered}

</h2>

</div>

<CheckCircle2

size={34}

className="text-green-500"

/>

</div>

</div>

<div className="

bg-gradient-to-r

from-orange-500

to-orange-600

rounded-2xl

shadow

p-5

text-white

">

<p className="text-orange-100 text-sm">

Revenue

</p>

<h2 className="text-3xl font-black mt-2">

₹ {stats.revenue.toLocaleString()}

</h2>

</div>

</div>





{/* =====================================
        SEARCH & FILTERS
===================================== */}

<div className="

bg-white

rounded-2xl

shadow

p-5

mb-8

">

<div className="

grid

grid-cols-1

lg:grid-cols-4

gap-4

">

<div className="relative lg:col-span-2">

<Search

size={18}

className="

absolute

left-4

top-1/2

-translate-y-1/2

text-slate-400

"

/>

<input

type="text"

value={search}

onChange={(e)=>setSearch(e.target.value)}

placeholder="Search order ID or customer..."

className="

w-full

border

rounded-xl

pl-11

pr-4

py-3

focus:ring-2

focus:ring-orange-500

outline-none

"

/>

</div>

<select

value={statusFilter}

onChange={(e)=>setStatusFilter(e.target.value)}

className="

border

rounded-xl

px-4

py-3

"

>

<option value="ALL">All Status</option>

<option value="PENDING">Pending</option>

<option value="CONFIRMED">Confirmed</option>

<option value="DISPATCHED">Dispatched</option>

<option value="DELIVERED">Delivered</option>

<option value="CANCELLED">Cancelled</option>

</select>

<select

value={dateFilter}

onChange={(e)=>setDateFilter(e.target.value)}

className="

border

rounded-xl

px-4

py-3

"

>

<option value="ALL">All Time</option>

<option value="TODAY">Today</option>

<option value="7_DAYS">Last 7 Days</option>

<option value="30_DAYS">Last 30 Days</option>

</select>

</div>

</div>
{/* =====================================
        RESULTS
===================================== */}

<div className="

bg-white

rounded-3xl

shadow-lg

overflow-hidden

">

<div className="

flex

flex-col

md:flex-row

md:items-center

md:justify-between

gap-4

px-6

py-5

border-b

">

<div>

<h2 className="text-xl font-bold">

Order List

</h2>

<p className="text-sm text-slate-500 mt-1">

Showing {filteredOrders.length} of {orders.length} orders

</p>

</div>

<button

type="button"

onClick={()=>{

const data=JSON.stringify(filteredOrders,null,2);

const blob=new Blob(

[data],

{type:"application/json"}

);

const url=URL.createObjectURL(blob);

const link=document.createElement("a");

link.href=url;

link.download="orders.json";

link.click();

URL.revokeObjectURL(url);

}}

className="

px-5

py-3

rounded-xl

border

hover:bg-slate-100

transition

"

>

Export Orders

</button>

</div>

{/* ===========================
        CONTENT
=========================== */}

{

loading

?

(

<div className="

flex

items-center

justify-center

py-24

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

Loading orders...

</p>

</div>

</div>

)

:

filteredOrders.length===0

?

(

<div className="

text-center

py-24

px-6

">

<div className="text-6xl mb-4">

📦

</div>

<h3 className="

text-2xl

font-bold

mb-2

">

No Orders Found

</h3>

<p className="

text-slate-500

max-w-md

mx-auto

">

No orders match your current search or filter.
Create your first order to get started.

</p>

<button

type="button"

onClick={()=>

navigate("/dashboard/orders/create")

}

className="

mt-8

px-6

py-3

rounded-xl

bg-orange-500

text-white

font-semibold

hover:bg-orange-600

transition

"

>

Create First Order

</button>

</div>

)

:

(

<OrderTable

orders={filteredOrders}

/>

)

}

</div>

</div>

);

}