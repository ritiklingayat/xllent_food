import {
useDispatch,
useSelector
}
from "react-redux";


import {

enableCustomization,

disableCustomization,

resetLayout

}
from "../customization/dashboardLayoutSlice";



export default function DashboardBuilderControls(){


const dispatch=useDispatch();


const mode =
useSelector(
state=>state.dashboardLayout.customizationMode
);



return (

<div
className="
flex
gap-3
"
>


<button

onClick={()=>{

mode

?

dispatch(disableCustomization())

:

dispatch(enableCustomization())

}}

className="
px-5
py-3
rounded-xl
bg-orange-500
text-white
font-bold
"

>


{

mode
?
"Save Layout"
:
"Customize Dashboard"

}


</button>



<button

onClick={()=>dispatch(resetLayout())}

className="
px-5
py-3
rounded-xl
bg-slate-200
font-bold
"

>

Reset

</button>


</div>


)


}