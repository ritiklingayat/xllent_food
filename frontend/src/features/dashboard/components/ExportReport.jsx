import {
Download
}
from "lucide-react";


import {
useSelector
}
from "react-redux";


import {
exportCSV
}
from "../utils/exportReport";



export default function ExportReport(){


const orders=
useSelector(
state=>
state.dashboard.recentOrders
);



return (

<button


onClick={()=>exportCSV(orders)}


className="
flex
items-center
gap-2
rounded-xl
bg-gradient-to-r
from-orange-500
to-red-500
px-5
py-3
text-white
font-bold
shadow-lg
hover:scale-105
transition
"


>


<Download size={18}/>


Export Report


</button>

);


}