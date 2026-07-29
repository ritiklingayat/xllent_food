import {
    Settings
}
from "lucide-react";


import {
    useDispatch
}
from "react-redux";


import {
    toggleDrawer
}
from "../customization/dashboardLayoutSlice";





export default function DashboardSettingsButton(){


const dispatch =
useDispatch();




return (

<button


onClick={()=>
dispatch(toggleDrawer())
}


className="
flex
items-center
gap-2
px-5
py-3
rounded-xl
bg-slate-900
text-white
font-semibold
shadow-lg
hover:scale-105
transition
"


>


<Settings size={18}/>

Dashboard Settings


</button>


);


}