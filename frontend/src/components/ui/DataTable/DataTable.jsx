import React, { useMemo, useState } from "react";

import {
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
} from "lucide-react";

import TableToolbar from "./TableToolbar";
import TablePagination from "./TablePagination";
import EmptyState from "./EmptyState";



const DataTable = ({

  columns = [],

  data = [],

  loading = false,


  // Toolbar
  searchable = true,

  search = "",

  onSearchChange,

  searchPlaceholder = "Search...",


  // Actions
  actions,


  // Selection
  selectable = false,

  selectedRows = [],

  onSelectionChange,


  // Sorting
  sorting = {},

  onSortChange,


  // Pagination
  pagination,

  onPageChange,

  onLimitChange,


  // Toolbar Actions
  onAdd,

  addLabel,

  onFilter,

  onExport,

  bulkActions,


  className = "",

}) => {



const [internalSearch,setInternalSearch] =
useState("");



const currentSearch =
onSearchChange
?
search
:
internalSearch;



const handleSearch=(value)=>{


if(onSearchChange){

onSearchChange(value);

}
else{

setInternalSearch(value);

}

};





/*
|--------------------------------------------------------------------------
| SORT HANDLER
|--------------------------------------------------------------------------
*/

const handleSort=(column)=>{


if(!column.sortable)

return;



const currentDirection =
sorting?.key === column.accessor
?
sorting.direction
:
null;



let direction="asc";


if(currentDirection==="asc")

direction="desc";


else if(currentDirection==="desc")

direction=null;



onSortChange?.({

key:
direction
?
column.accessor
:
null,

direction

});


};






/*
|--------------------------------------------------------------------------
| ROW SELECTION
|--------------------------------------------------------------------------
*/


const toggleRow=(row)=>{


let updated=[...selectedRows];


if(updated.includes(row.id))

{

updated =
updated.filter(
(id)=>id!==row.id
);

}

else

{

updated.push(row.id);

}



onSelectionChange?.(updated);


};





const toggleAll=()=>{


const allIds =
data.map(
(row)=>row.id
);



const isAllSelected =
selectedRows.length === data.length
&&
data.length>0;



onSelectionChange?.(

isAllSelected
?
[]
:
allIds

);


};







const isSelected=(id)=>
selectedRows.includes(id);





/*
|--------------------------------------------------------------------------
| COLUMNS COUNT
|--------------------------------------------------------------------------
*/


const columnCount =
columns.length +
(selectable ? 1:0)+
(actions ? 1:0);






return (


<div

className={`
space-y-4
${className}
`}

>



{
searchable &&

<TableToolbar


search={currentSearch}

setSearch={handleSearch}

placeholder={searchPlaceholder}


selectedRows={selectedRows}


onAdd={onAdd}

addLabel={addLabel}


onFilter={onFilter}

onExport={onExport}


bulkActions={bulkActions}


/>

}





<div

className="
overflow-hidden
rounded-xl
border
bg-white
shadow-sm
"

>


<div

className="
overflow-x-auto
"

>


<table

className="
min-w-full
divide-y
"

>


<thead

className="
bg-gray-50
"

>


<tr>


{
selectable &&

<th

className="
px-6
py-4
text-left
"

>


<input

type="checkbox"

checked={
data.length>0 &&
selectedRows.length===data.length
}

onChange={toggleAll}

aria-label="Select all rows"

/>


</th>

}





{
columns.map(
(column)=>(


<th

key={column.accessor}

className="
px-6
py-4
text-left
text-sm
font-semibold
text-gray-600
"

>


<button

disabled={!column.sortable}

onClick={()=>handleSort(column)}

className="
flex
items-center
gap-2
"

>


{column.header}



{
column.sortable &&

(

sorting?.key===column.accessor

?

sorting.direction==="asc"

?

<ChevronUp size={16}/>

:

<ChevronDown size={16}/>

:

<ChevronsUpDown size={16}/>

)

}



</button>


</th>


)

)

}





{
actions &&

<th

className="
px-6
py-4
text-right
text-sm
font-semibold
text-gray-600
"

>

Actions

</th>

}



</tr>


</thead>






<tbody

className="
divide-y
"

>



{
loading &&

Array.from({
length:5
}).map(
(_,index)=>(


<tr key={index}>


<td

colSpan={columnCount}

className="
px-6
py-5
"

>


<div

className="
h-5
w-full
animate-pulse
rounded
bg-gray-200
"

/>


</td>


</tr>


)

)

}




{
!loading &&
data.length===0 &&

<tr>

<td

colSpan={columnCount}

>

<EmptyState/>

</td>

</tr>

}





{
!loading &&
data.map(
(row)=>(


<tr

key={row.id}

className="
transition
hover:bg-gray-50
"

>


{
selectable &&

<td

className="
px-6
py-4
"

>


<input

type="checkbox"

checked={
isSelected(row.id)
}

onChange={()=>
toggleRow(row)
}

/>


</td>

}





{
columns.map(
(column)=>(


<td

key={column.accessor}

className="
px-6
py-4
text-sm
text-gray-700
"

>


{
column.cell

?

column.cell(row)

:

row[column.accessor]

}


</td>


)

)

}





{
actions &&

<td

className="
px-6
py-4
text-right
"

>


{actions(row)}


</td>

}



</tr>


)

)

}



</tbody>



</table>


</div>



</div>






{
pagination &&

<TablePagination


pagination={pagination}

onPageChange={onPageChange}

onLimitChange={onLimitChange}


/>

}



</div>


);


};



export default DataTable;