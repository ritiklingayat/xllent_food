import {
useDispatch,
useSelector
}
from "react-redux";


import {
setDateRange,
fetchDashboard
}
from "../dashboardSlice";



const filters=[

["Today","TODAY"],

["7 Days","7D"],

["30 Days","30D"],

["90 Days","90D"]

];



export default function DashboardFilters(){


const dispatch=useDispatch();


const active=
useSelector(
state=>state.dashboard.dateRange.type
);



const change=(value)=>{


dispatch(

setDateRange({

type:value,

start:null,

end:null

})

);



dispatch(
fetchDashboard(value)
);


};



return (

<div
className="
flex
gap-2
flex-wrap
"
>


{

filters.map(
item=>(


<button

key={item[1]}

onClick={()=>change(item[1])}

className={`
px-4
py-2
rounded-xl
font-semibold
text-sm

${
active===item[1]

?

"bg-orange-500 text-white"

:

"bg-slate-100"

}

`}

>

{item[0]}

</button>


)

)


}


</div>

)

}