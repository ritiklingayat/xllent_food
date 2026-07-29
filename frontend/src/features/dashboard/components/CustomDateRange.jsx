import {
useDispatch
}
from "react-redux";


import {
setDateRange
}
from "../dashboardSlice";



export default function CustomDateRange(){


const dispatch=useDispatch();



return (

<div
className="
flex
gap-3
items-center
"
>


<input

type="date"

className="
rounded-xl
border
px-3
py-2
"


id="startDate"

/>



<input

type="date"

className="
rounded-xl
border
px-3
py-2
"


id="endDate"

/>



<button


onClick={()=>{


dispatch(

setDateRange({

type:"CUSTOM",

start:
document.getElementById(
"startDate"
).value,


end:
document.getElementById(
"endDate"
).value


})

)


}}


className="
px-4
py-2
rounded-xl
bg-orange-500
text-white
font-semibold
"


>

Apply

</button>



</div>

);

}