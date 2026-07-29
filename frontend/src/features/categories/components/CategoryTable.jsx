import React from "react";

import {
  Edit,
  Trash2,
  Eye,
  FolderOpen,
} from "lucide-react";



const CategoryTable = ({
  categories=[],
  loading=false,
  onEdit,
  onDelete,
  onView,
})=>{


if(loading){

return (

<div className="rounded-xl border bg-white">

<table className="w-full">

<tbody>

{
[1,2,3,4].map(i=>(

<tr key={i}>

<td className="p-5">

<div className="
h-4
w-full
animate-pulse
rounded
bg-gray-200
"/>

</td>

</tr>

))
}

</tbody>

</table>

</div>

);

}



if(!categories.length){

return (

<div className="
rounded-xl
border
bg-white
py-20
text-center
">

<FolderOpen
size={48}
className="
mx-auto
text-gray-400
"/>


<h3 className="
mt-4
text-lg
font-semibold
">

No Categories Found

</h3>


<p className="
text-sm
text-gray-500
">

Create categories to organize products.

</p>


</div>

);

}



return (

<div className="
overflow-hidden
rounded-xl
border
bg-white
shadow-sm
">


<div className="overflow-x-auto">


<table className="min-w-full text-sm">


<thead
className="
border-b
bg-gray-50
text-left
"
>


<tr>


<th className="px-6 py-4">
Category
</th>


<th className="px-6 py-4">
Products
</th>


<th className="px-6 py-4">
Status
</th>


<th className="
px-6
py-4
text-right
">

Actions

</th>


</tr>


</thead>



<tbody>


{
categories.map((category)=>(


<tr
key={category.id}
className="
border-b
last:border-none
hover:bg-gray-50
"
>


<td className="px-6 py-4">


<div className="
flex
items-center
gap-3
">


<img

src={
category.image ||
"/placeholder.png"
}

alt={category.name}

className="
h-12
w-12
rounded-lg
object-cover
"

/>


<div>

<p className="
font-medium
">

{category.name}

</p>


<p className="
text-xs
text-gray-500
">

Slug: {category.slug}

</p>


</div>


</div>


</td>




<td className="px-6 py-4">

{category.productsCount ?? 0}

</td>



<td className="px-6 py-4">


<span
className={`
rounded-full
px-3
py-1
text-xs
font-medium

${
category.status==="active"

?

"bg-green-100 text-green-700"

:

"bg-red-100 text-red-700"

}

`}
>

{category.status}

</span>


</td>




<td className="px-6 py-4">


<div className="
flex
justify-end
gap-2
">


<button
onClick={()=>onView(category)}
className="
rounded-lg
p-2
text-blue-600
hover:bg-blue-50
"
>

<Eye size={18}/>

</button>



<button
onClick={()=>onEdit(category)}
className="
rounded-lg
p-2
text-yellow-600
hover:bg-yellow-50
"
>

<Edit size={18}/>

</button>



<button
onClick={()=>onDelete(category)}
className="
rounded-lg
p-2
text-red-600
hover:bg-red-50
"
>

<Trash2 size={18}/>

</button>



</div>


</td>


</tr>


))

}


</tbody>


</table>


</div>


</div>


);


};


export default CategoryTable;