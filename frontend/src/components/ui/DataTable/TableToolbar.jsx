import React from "react";

import {
  Search,
  X,
  Plus,
  SlidersHorizontal,
  Download,
} from "lucide-react";



const TableToolbar = ({

  search="",

  setSearch,

  placeholder="Search...",

  selectedRows=[],

  onAdd,

  addLabel="Add New",

  onFilter,

  onExport,

  bulkActions=[],

}) => {



return (

<div

className="
flex
flex-col
gap-4
rounded-xl
border
bg-white
p-4

sm:flex-row
sm:items-center
sm:justify-between
"

>


{/* LEFT SECTION */}

<div

className="
flex
flex-1
items-center
gap-3
"

>


{/* SEARCH */}

<div

className="
relative
w-full
max-w-md
"

>


<Search

size={18}

className="
absolute
left-3
top-1/2
-translate-y-1/2
text-gray-400
"

/>



<input

value={search}

onChange={(e)=>
setSearch(e.target.value)
}

placeholder={placeholder}

className="
w-full
rounded-lg
border
py-2
pl-10
pr-10
text-sm

outline-none

focus:border-blue-500
focus:ring-2
focus:ring-blue-100
"

/>



{
search &&

<button

onClick={()=>
setSearch("")
}

className="
absolute
right-3
top-1/2
-translate-y-1/2
text-gray-400
hover:text-gray-700
"

>

<X size={16}/>

</button>

}



</div>



{/* FILTER BUTTON */}

{
onFilter &&

<button

onClick={onFilter}

className="
flex
items-center
gap-2
rounded-lg
border
px-4
py-2
text-sm

hover:bg-gray-50
"

>

<SlidersHorizontal size={16}/>

Filter

</button>

}



</div>





{/* RIGHT SECTION */}

<div

className="
flex
items-center
gap-2
"

>



{/* BULK ACTIONS */}

{
selectedRows.length > 0 &&

bulkActions.map(
(action)=>(


<button

key={action.label}

onClick={action.onClick}

className={`
flex
items-center
gap-2
rounded-lg
px-4
py-2
text-sm

${

action.variant==="danger"

?

"bg-red-600 text-white hover:bg-red-700"

:

"bg-gray-900 text-white hover:bg-gray-800"

}

`}

>


{
action.icon
}

{action.label}


</button>


)

)

}





{/* EXPORT */}

{
onExport &&

<button

onClick={onExport}

className="
flex
items-center
gap-2
rounded-lg
border
px-4
py-2
text-sm

hover:bg-gray-50
"

>

<Download size={16}/>

Export

</button>

}




{/* ADD */}

{
onAdd &&

<button

onClick={onAdd}

className="
flex
items-center
gap-2
rounded-lg
bg-blue-600
px-4
py-2
text-sm
font-medium
text-white

hover:bg-blue-700
"

>

<Plus size={16}/>

{addLabel}

</button>

}



</div>


</div>


);


};



export default TableToolbar;