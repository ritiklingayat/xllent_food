import React, { useMemo } from "react";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";



const TablePagination = ({

  pagination,

  onPageChange,

  onLimitChange,

}) => {



const {

  page=1,

  limit=10,

  total=0,

  totalPages=1

}=pagination || {};





const pages = useMemo(()=>{


const range=[];


if(totalPages <= 5)

{

for(
let i=1;
i<=totalPages;
i++
)

{

range.push(i);

}

}

else

{


if(page <=3)

{

range.push(
1,
2,
3,
4,
"...",
totalPages
);

}

else if(
page >= totalPages-2
)

{

range.push(

1,
"...",
totalPages-3,
totalPages-2,
totalPages-1,
totalPages

);

}

else

{

range.push(

1,
"...",
page-1,
page,
page+1,
"...",
totalPages

);

}


}


return range;


},[
page,
totalPages
]);






return (

<div

className="
flex
flex-col
gap-4
border-t
bg-white
px-4
py-4

sm:flex-row
sm:items-center
sm:justify-between
"

>



{/* RECORD INFO */}

<div

className="
text-sm
text-gray-500
"

>


Showing

<span className="
mx-1
font-medium
text-gray-700
">

{Math.min(
(page-1)*limit+1,
total
)}

</span>


to


<span className="
mx-1
font-medium
text-gray-700
">

{
Math.min(
page*limit,
total
)
}

</span>


of


<span className="
mx-1
font-medium
text-gray-700
">

{total}

</span>


results


</div>






<div

className="
flex
items-center
gap-3
"

>


{/* LIMIT SELECT */}

<select

value={limit}

onChange={(e)=>
onLimitChange?.(
Number(e.target.value)
)
}

className="
rounded-lg
border
px-3
py-2
text-sm
outline-none

focus:border-blue-500
"

>


<option value={10}>
10 / page
</option>


<option value={25}>
25 / page
</option>


<option value={50}>
50 / page
</option>


<option value={100}>
100 / page
</option>


</select>







{/* PAGINATION BUTTONS */}

<div

className="
flex
items-center
gap-1
"

>



<button

disabled={page===1}

onClick={()=>
onPageChange(page-1)
}

className="
rounded-lg
border
p-2

disabled:cursor-not-allowed
disabled:opacity-40

hover:bg-gray-50
"

>

<ChevronLeft size={18}/>

</button>






{
pages.map(
(item,index)=>


item==="..." ?


<span

key={`dots-${index}`}

className="
px-2
text-gray-400
"

>

...

</span>


:


<button

key={item}

onClick={()=>
onPageChange(item)
}

className={`
h-9
min-w-9
rounded-lg
text-sm

${

page===item

?

"bg-blue-600 text-white"

:

"border hover:bg-gray-50"

}

`}

>

{item}

</button>


)

}






<button

disabled={
page===totalPages
}

onClick={()=>
onPageChange(page+1)
}

className="
rounded-lg
border
p-2

disabled:cursor-not-allowed
disabled:opacity-40

hover:bg-gray-50
"

>

<ChevronRight size={18}/>

</button>



</div>



</div>




</div>


);


};



export default TablePagination;