import React,{
useMemo,
useState,
useEffect
}
from "react";

import{
Receipt,
Calculator,
IndianRupee,
Percent
}
from "lucide-react";

export default function OrderSummary({

items=[],

customer=null,

onItemsChange,

onSave,

onCancel

}){

/*
========================================
STATE
========================================
*/

const[gstPercent,setGstPercent]=useState(0);

const[discountPercent,setDiscountPercent]=useState(0);

const[paymentMethod,setPaymentMethod]=useState("CASH");

const[paymentStatus,setPaymentStatus]=useState("PENDING");

const[remarks,setRemarks]=useState("");





/*
========================================
AUTO GST
========================================
*/

useEffect(()=>{

if(items.length===0){

setGstPercent(0);

return;

}

const averageGST=

items.reduce(

(sum,item)=>

sum+

Number(item.gst || 0),

0

)

/ items.length;

setGstPercent(

Number(averageGST.toFixed(2))

);

},[items]);






/*
========================================
TOTAL ITEMS
========================================
*/

const totalItems=useMemo(()=>{

return items.length;

},[items]);






/*
========================================
TOTAL QUANTITY
========================================
*/

const totalQuantity=useMemo(()=>{

return items.reduce(

(sum,item)=>

sum+

Number(item.quantity || 0),

0

);

},[items]);







/*
========================================
SUBTOTAL
========================================
*/

const subtotal=useMemo(()=>{

return items.reduce(

(sum,item)=>

sum+

(

Number(item.price || 0)

*

Number(item.quantity || 0)

),

0

);

},[items]);







/*
========================================
GST AMOUNT
========================================
*/

const gstAmount=useMemo(()=>{

return(

subtotal*

gstPercent

)/100;

},[subtotal,gstPercent]);








/*
========================================
DISCOUNT
========================================
*/

const discountAmount=useMemo(()=>{

return(

subtotal*

discountPercent

)/100;

},[

subtotal,

discountPercent

]);








/*
========================================
GRAND TOTAL
========================================
*/

const grandTotal=useMemo(()=>{

return(

subtotal+

gstAmount-

discountAmount

);

},[

subtotal,

gstAmount,

discountAmount

]);
/*
========================================
HELPERS
========================================
*/

const updateQuantity=(productId,newQuantity)=>{

if(newQuantity<1){

return;

}

const updatedItems=items.map(item=>

String(item.productId)===String(productId)

?

{

...item,

quantity:newQuantity,

total:

Number(item.price||0)*newQuantity

}

:

item

);

onItemsChange?.(updatedItems);

};





const removeItem=(productId)=>{

const updatedItems=

items.filter(item=>

String(item.productId)!==

String(productId)

);

onItemsChange?.(updatedItems);

};






/*
========================================
RETURN
========================================
*/

return(

<div className="space-y-6">

{/* =====================================
        ORDER ITEMS
===================================== */}

<div className="bg-white rounded-3xl shadow-lg overflow-hidden">

<div className="px-6 py-5 border-b flex items-center justify-between">

<div>

<h2 className="text-xl font-bold flex items-center gap-2">

<Receipt size={22}/>

Order Items

</h2>

<p className="text-sm text-slate-500 mt-1">

{totalItems} Products • {totalQuantity} Qty

</p>

</div>

</div>

{

items.length===0

?

(

<div className="py-20 text-center">

<div className="text-6xl mb-4">

🛒

</div>

<h3 className="text-2xl font-bold">

Cart is Empty

</h3>

<p className="text-slate-500 mt-2">

Select products to begin creating an order.

</p>

</div>

)

:

(

<div className="overflow-x-auto">

<table className="min-w-full">

<thead className="bg-slate-50">

<tr>

<th className="px-6 py-4 text-left">

Product

</th>

<th className="px-4 py-4 text-center">

Price

</th>

<th className="px-4 py-4 text-center">

Qty

</th>

<th className="px-4 py-4 text-center">

Total

</th>

<th className="px-4 py-4 text-center">

Action

</th>

</tr>

</thead>

<tbody>

{

items.map(item=>(

<tr

key={item.productId}

className="border-t hover:bg-slate-50"

>

<td className="px-6 py-4">

<div className="flex items-center gap-4">

<img

src={
item.image ||

"https://placehold.co/80x80"
}

alt={item.productName}

className="

w-14

h-14

rounded-xl

object-cover

"

/>

<div>

<p className="font-semibold">

{item.productName}

</p>

<p className="text-sm text-slate-500">

{item.unit}

</p>

</div>

</div>

</td>

<td className="text-center font-semibold">

₹ {Number(item.price||0).toFixed(2)}

</td>

<td>

<div className="flex items-center justify-center gap-2">

<button

type="button"

onClick={()=>

updateQuantity(

item.productId,

item.quantity-1

)

}

className="

w-8

h-8

rounded-lg

bg-slate-200

hover:bg-slate-300

"

>

-

</button>

<span className="w-10 text-center font-bold">

{item.quantity}

</span>

<button

type="button"

onClick={()=>

updateQuantity(

item.productId,

item.quantity+1

)

}

className="

w-8

h-8

rounded-lg

bg-orange-500

text-white

hover:bg-orange-600

"

>

+

</button>

</div>

</td>

<td className="text-center font-bold text-green-600">

₹ {(Number(item.price||0)*Number(item.quantity||0)).toFixed(2)}

</td>

<td className="text-center">

<button

type="button"

onClick={()=>

removeItem(item.productId)

}

className="

text-red-500

hover:text-red-700

font-semibold

"

>

Remove

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
{/* =====================================
        ORDER SUMMARY
===================================== */}

<div className="

bg-white

rounded-3xl

shadow-lg

p-6

">

<div className="flex items-center gap-3 mb-6">

<div className="

w-12

h-12

rounded-2xl

bg-orange-100

flex

items-center

justify-center

">

<Calculator
size={22}
className="text-orange-600"
/>

</div>

<div>

<h2 className="text-xl font-bold">

Order Summary

</h2>

<p className="text-slate-500 text-sm">

Live order calculations

</p>

</div>

</div>

{/* =====================================
        TOTALS
===================================== */}

<div className="space-y-4">

<div className="flex justify-between items-center">

<span className="text-slate-600">

Total Products

</span>

<span className="font-bold">

{totalItems}

</span>

</div>

<div className="flex justify-between items-center">

<span className="text-slate-600">

Total Quantity

</span>

<span className="font-bold">

{totalQuantity}

</span>

</div>

<hr/>

<div className="flex justify-between items-center">

<span className="text-slate-600">

Subtotal

</span>

<span className="font-semibold">

₹ {subtotal.toFixed(2)}

</span>

</div>

{/* GST */}

<div>

<div className="flex justify-between items-center mb-2">

<span className="flex items-center gap-2">

<Percent size={16}/>

GST %

</span>

<input

type="number"

min="0"

max="100"

value={gstPercent}

onChange={(e)=>

setGstPercent(

Number(e.target.value)

)

}

className="

w-24

border

rounded-lg

px-3

py-2

text-right

"

/>

</div>

<div className="flex justify-between">

<span className="text-slate-500">

GST Amount

</span>

<span>

₹ {gstAmount.toFixed(2)}

</span>

</div>

</div>

{/* DISCOUNT */}

<div>

<div className="flex justify-between items-center mb-2">

<span>

Discount %

</span>

<input

type="number"

min="0"

max="100"

value={discountPercent}

onChange={(e)=>

setDiscountPercent(

Number(e.target.value)

)

}

className="

w-24

border

rounded-lg

px-3

py-2

text-right

"

/>

</div>

<div className="flex justify-between">

<span className="text-slate-500">

Discount Amount

</span>

<span className="text-red-600">

- ₹ {discountAmount.toFixed(2)}

</span>

</div>

</div>

<hr className="my-3"/>

{/* GRAND TOTAL */}

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

Including GST & Discount

</p>

</div>

<div className="

text-3xl

font-black

text-orange-600

">

₹ {grandTotal.toFixed(2)}

</div>

</div>

</div>

</div>
{/* =====================================
        PAYMENT & ORDER DETAILS
===================================== */}

<div className="

bg-white

rounded-3xl

shadow-lg

p-6

">

<div className="mb-6">

<h2 className="text-xl font-bold">

Payment Details

</h2>

<p className="text-slate-500 text-sm">

Payment information for this order

</p>

</div>

<div className="grid md:grid-cols-2 gap-6">

{/* PAYMENT METHOD */}

<div>

<label className="

block

text-sm

font-semibold

mb-2

">

Payment Method

</label>

<select

value={paymentMethod}

onChange={(e)=>

setPaymentMethod(e.target.value)

}

className="

w-full

border

rounded-xl

px-4

py-3

focus:ring-2

focus:ring-orange-500

outline-none

"

>

<option value="CASH">

Cash

</option>

<option value="UPI">

UPI

</option>

<option value="BANK_TRANSFER">

Bank Transfer

</option>

<option value="CHEQUE">

Cheque

</option>

<option value="CREDIT">

Credit

</option>

</select>

</div>

{/* PAYMENT STATUS */}

<div>

<label className="

block

text-sm

font-semibold

mb-2

">

Payment Status

</label>

<select

value={paymentStatus}

onChange={(e)=>

setPaymentStatus(e.target.value)

}

className="

w-full

border

rounded-xl

px-4

py-3

focus:ring-2

focus:ring-orange-500

outline-none

"

>

<option value="PENDING">

Pending

</option>

<option value="PAID">

Paid

</option>

<option value="PARTIAL">

Partially Paid

</option>

</select>

</div>

</div>

{/* CUSTOMER */}

{

customer && (

<div className="

mt-6

rounded-2xl

bg-slate-50

border

p-5

">

<h3 className="font-bold mb-3">

Customer Information

</h3>

<div className="grid md:grid-cols-2 gap-4">

<div>

<p className="text-xs text-slate-500">

Customer

</p>

<p className="font-semibold">

{customer.shopName}

</p>

</div>

<div>

<p className="text-xs text-slate-500">

Owner

</p>

<p className="font-semibold">

{customer.ownerName || "-"}

</p>

</div>

<div>

<p className="text-xs text-slate-500">

Mobile

</p>

<p className="font-semibold">

{customer.mobile || "-"}

</p>

</div>

<div>

<p className="text-xs text-slate-500">

Shop Type

</p>

<p className="font-semibold">

{customer.shopType || "-"}

</p>

</div>

</div>

</div>

)

}

{/* REMARKS */}

<div className="mt-6">

<label className="

block

text-sm

font-semibold

mb-2

">

Remarks

</label>

<textarea

rows={4}

value={remarks}

onChange={(e)=>

setRemarks(e.target.value)

}

placeholder="Enter delivery instructions, notes, or any remarks..."

className="

w-full

border

rounded-xl

p-4

resize-none

focus:ring-2

focus:ring-orange-500

outline-none

"

/>

</div>

</div>
{/* =====================================
        ACTION BUTTONS
===================================== */}

<div className="

bg-white

rounded-3xl

shadow-lg

p-6

">

<div className="

flex

flex-col

md:flex-row

justify-between

items-center

gap-4

">

<div>

<h3 className="text-lg font-bold">

Ready to Create Order

</h3>

<p className="text-sm text-slate-500">

Review the order details before saving.

</p>

</div>

<div className="

flex

flex-wrap

justify-end

gap-3

">

<button

type="button"

onClick={onCancel}

className="

px-6

py-3

rounded-xl

border

border-slate-300

bg-white

hover:bg-slate-100

transition

"

>

Cancel

</button>

<button

type="button"

onClick={() => window.print()}

className="

px-6

py-3

rounded-xl

border

border-blue-500

text-blue-600

hover:bg-blue-50

transition

"

>

Print Order

</button>

<button

type="button"

disabled={!customer || items.length===0}

onClick={()=>

onSave?.({

customer,

items,

totals:{

totalItems,

totalQuantity,

subtotal,

gstPercent,

gstAmount,

discountPercent,

discountAmount,

grandTotal

},

payment:{

method:paymentMethod,

status:paymentStatus

},

remarks

})

}

className="

px-8

py-3

rounded-xl

font-bold

text-white

bg-orange-500

hover:bg-orange-600

disabled:bg-slate-300

disabled:cursor-not-allowed

transition

"

>

Save Order

</button>

</div>

</div>

</div>

</div>

);

}