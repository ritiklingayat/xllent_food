import React,{
useState,
useMemo,
useRef,
useEffect
}
from "react";

import{

Search,
ChevronDown,
Store,
Phone,
User,
MapPin

}
from "lucide-react";

export default function CustomerSelector({

customers=[],

value="",

onChange

}){

const containerRef=useRef(null);

const searchInputRef=useRef(null);

const[open,setOpen]=useState(false);

const[search,setSearch]=useState("");

const[activeIndex,setActiveIndex]=useState(-1);





/*
==================================
SELECTED CUSTOMER
==================================
*/

const selectedCustomer=useMemo(()=>{

return customers.find(

customer=>

String(customer.id)===

String(value)

);

},[customers,value]);






/*
==================================
FILTER CUSTOMERS
==================================
*/

const filteredCustomers=useMemo(()=>{

const keyword=search

.trim()

.toLowerCase();

if(!keyword){

return customers;

}

return customers.filter(customer=>{

return(

(customer.shopName||"")

.toLowerCase()

.includes(keyword)

||

(customer.ownerName||"")

.toLowerCase()

.includes(keyword)

||

(customer.mobile||"")

.toLowerCase()

.includes(keyword)

||

(customer.salesOfficer||"")

.toLowerCase()

.includes(keyword)

);

});

},[customers,search]);






/*
==================================
OPEN DROPDOWN
==================================
*/

const openDropdown=()=>{

setOpen(true);

setTimeout(()=>{

searchInputRef.current?.focus();

},100);

};





const closeDropdown=()=>{

setOpen(false);

setSearch("");

setActiveIndex(-1);

};






/*
==================================
CLICK OUTSIDE
==================================
*/

useEffect(()=>{

const handleOutside=(event)=>{

if(

containerRef.current &&

!containerRef.current.contains(

event.target

)

){

closeDropdown();

}

};

document.addEventListener(

"mousedown",

handleOutside

);

return()=>{

document.removeEventListener(

"mousedown",

handleOutside

);

};

},[]);







/*
==================================
KEYBOARD NAVIGATION
==================================
*/

const handleKeyDown=(event)=>{

if(!open){

return;

}

switch(event.key){

case "ArrowDown":

event.preventDefault();

setActiveIndex(prev=>

Math.min(

prev+1,

filteredCustomers.length-1

)

);

break;

case "ArrowUp":

event.preventDefault();

setActiveIndex(prev=>

Math.max(

prev-1,

0

)

);

break;

case "Enter":

event.preventDefault();

if(

filteredCustomers[activeIndex]

){

const customer=

filteredCustomers[activeIndex];

onChange(customer.id);

closeDropdown();

}

break;

case "Escape":

closeDropdown();

break;

default:

break;

}

};
return (

<div
ref={containerRef}
className="relative"
onKeyDown={handleKeyDown}
>

{/* ==========================================
    SELECT BOX
========================================== */}

<button

type="button"

onClick={()=>

open

?

closeDropdown()

:

openDropdown()

}

className="

w-full

bg-white

border

rounded-2xl

px-5

py-4

flex

items-center

justify-between

hover:border-orange-400

focus:ring-2

focus:ring-orange-400

transition

"

>

<div className="flex items-center gap-4">

<div className="

w-12

h-12

rounded-xl

bg-orange-100

flex

items-center

justify-center

">

<Store
size={22}
className="text-orange-600"
/>

</div>

<div className="text-left">

{

selectedCustomer

?

<>

<p className="font-bold">

{selectedCustomer.shopName}

</p>

<p className="text-sm text-slate-500">

{selectedCustomer.ownerName}

</p>

</>

:

<>

<p className="font-semibold">

Select Customer

</p>

<p className="text-sm text-slate-500">

Search shop name or mobile

</p>

</>

}

</div>

</div>

<ChevronDown
size={20}
className={`
transition-transform
${open ? "rotate-180" : ""}
`}
/>

</button>





{/* ==========================================
      DROPDOWN
========================================== */}

{

open &&

(

<div className="

absolute

z-50

w-full

mt-3

bg-white

rounded-3xl

shadow-2xl

border

overflow-hidden

">

{/* SEARCH */}

<div className="p-4 border-b">

<div className="relative">

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

ref={searchInputRef}

value={search}

onChange={(e)=>

setSearch(e.target.value)

}

placeholder="Search customer..."

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

</div>






{/* CUSTOMER LIST */}

<div className="

max-h-96

overflow-y-auto

">

{

filteredCustomers.length===0

?

(

<div className="

p-10

text-center

text-slate-500

">

No Customers Found

</div>

)

:

(

filteredCustomers.map(

(customer,index)=>(

<button

key={customer.id}

type="button"

onClick={()=>{

onChange(customer.id);

closeDropdown();

}}

className={`

w-full

text-left

p-5

border-b

transition

hover:bg-orange-50

${

activeIndex===index

?

"bg-orange-50"

:

""

}

`}

>

<div className="

flex

justify-between

items-start

">

<div>

<p className="

font-bold

text-slate-800

">

{customer.shopName}

</p>

<p className="

text-sm

text-slate-500

mt-1

">

{customer.ownerName}

</p>

</div>

<span
className={`
px-3
py-1
rounded-full
text-xs
font-semibold

${customer.shopType==="SUPER_STOCKIST"
?"bg-purple-100 text-purple-700"
:customer.shopType==="DISTRIBUTOR"
?"bg-blue-100 text-blue-700"
:"bg-green-100 text-green-700"}

`}
>

{customer.shopType}

</span>

</div>

<div className="

mt-4

grid

grid-cols-2

gap-4

text-sm

text-slate-600

">

<div className="flex items-center gap-2">

<Phone size={15}/>

{customer.mobile}

</div>

<div className="flex items-center gap-2">

<User size={15}/>

{customer.salesOfficer||

"-"}

</div>

<div className="

col-span-2

flex

items-start

gap-2

">

<MapPin

size={15}

className="mt-1"

/>

<span>

{customer.address||

"No address"}

</span>

</div>

</div>

</button>

)

)

)

}

</div>

</div>

)

}
{/* ==========================================
    SELECTED CUSTOMER SUMMARY
========================================== */}

{
selectedCustomer && (

<div className="

mt-5

bg-gradient-to-r

from-orange-50

to-white

border

border-orange-200

rounded-2xl

p-5

">

<div className="flex items-center justify-between">

<div>

<h3 className="text-lg font-bold text-slate-800">

Selected Customer

</h3>

<p className="text-slate-500 text-sm">

Order will be created for this customer.

</p>

</div>

<span
className={`
px-3
py-1
rounded-full
text-xs
font-bold

${selectedCustomer.shopType==="SUPER_STOCKIST"
?"bg-purple-100 text-purple-700"
:selectedCustomer.shopType==="DISTRIBUTOR"
?"bg-blue-100 text-blue-700"
:"bg-green-100 text-green-700"}

`}
>

{selectedCustomer.shopType}

</span>

</div>

<div className="grid md:grid-cols-2 gap-5 mt-5">

<div>

<p className="text-xs uppercase text-slate-500">

Shop Name

</p>

<p className="font-semibold">

{selectedCustomer.shopName}

</p>

</div>

<div>

<p className="text-xs uppercase text-slate-500">

Owner

</p>

<p className="font-semibold">

{selectedCustomer.ownerName || "-"}

</p>

</div>

<div>

<p className="text-xs uppercase text-slate-500">

Mobile

</p>

<p className="font-semibold">

{selectedCustomer.mobile || "-"}

</p>

</div>

<div>

<p className="text-xs uppercase text-slate-500">

Sales Officer

</p>

<p className="font-semibold">

{selectedCustomer.salesOfficer || "-"}

</p>

</div>

<div className="md:col-span-2">

<p className="text-xs uppercase text-slate-500">

Address

</p>

<p className="font-semibold">

{selectedCustomer.address || "No address available"}

</p>

</div>

</div>

</div>

)

}

</div>

);

}
