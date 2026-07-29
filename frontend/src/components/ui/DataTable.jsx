import {
motion
}
from "framer-motion";


export default function DataTable({
columns,
data
}){


return (

<div className="
bg-white
rounded-2xl
shadow-sm
border
overflow-hidden
">


<table className="
w-full
">


<thead className="
bg-slate-50
">


<tr>

{
columns.map(col=>

<th

key={col.key}

className="
px-6
py-4
text-left
text-sm
font-semibold
text-gray-600
"

>

{col.title}

</th>

)

}


</tr>


</thead>


<tbody>


{

data.map(row=>

<motion.tr

initial={{
opacity:0,
y:10
}}

animate={{
opacity:1,
y:0
}}


key={row.id}

className="
border-t
hover:bg-slate-50
"

>


{

columns.map(col=>

<td

key={col.key}

className="
px-6
py-4
"

>

{

col.render
?
col.render(row)
:
row[col.key]

}


</td>


)

}



</motion.tr>


)


}



</tbody>


</table>


</div>


)

}