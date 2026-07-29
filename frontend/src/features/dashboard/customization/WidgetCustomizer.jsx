import {
useDispatch,
useSelector
}
from "react-redux";


import {
toggleWidget,
resetLayout
}
from "./dashboardLayoutSlice";



export default function WidgetCustomizer(){


const dispatch=useDispatch();


const widgets=
useSelector(
state=>state.dashboardLayout.widgets
);



return (

<div
className="
bg-white
rounded-3xl
p-6
shadow-lg
border
"
>


<h2
className="
font-black
text-xl
mb-5
"
>

Dashboard Widgets

</h2>


{
widgets.map(widget=>(


<label

key={widget.id}

className="
flex
justify-between
py-3
border-b
"

>


<span>

{widget.title}

</span>


<input

type="checkbox"

checked={
widget.enabled
}

onChange={()=>
dispatch(
toggleWidget(widget.id)
)
}

/>


</label>


))

}



<button

onClick={()=>
dispatch(resetLayout())
}

className="
mt-5
bg-red-500
text-white
px-5
py-3
rounded-xl
font-bold
"

>

Reset Layout

</button>


</div>

)


}