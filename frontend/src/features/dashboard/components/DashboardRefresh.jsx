import {
RefreshCcw
}
from "lucide-react";


export default function DashboardRefresh({
onRefresh
}){


return (

<button

onClick={onRefresh}

className="
flex
items-center
gap-2
rounded-xl
bg-white
text-orange-600
px-4
py-3
font-bold
shadow-lg
hover:scale-105
transition
"

>


<RefreshCcw size={18}/>


Refresh


</button>

)

}