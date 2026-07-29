import React from "react";


import {

DndContext,

closestCenter

}
from "@dnd-kit/core";



import {

arrayMove,

SortableContext,

verticalListSortingStrategy

}
from "@dnd-kit/sortable";



import {

useDispatch,

useSelector

}
from "react-redux";



import {

reorderWidgets

}
from "./dashboardLayoutSlice";



import {

saveDashboardLayout

}
from "./layoutStorage";



import WidgetSortable
from "./WidgetSortable";



import WidgetRenderer
from "../components/WidgetRenderer";







export default function SortableDashboard(){



const dispatch =
useDispatch();




const widgets =
useSelector(
state=>state.dashboardLayout.widgets
);



const dashboardData =
useSelector(
state=>state.dashboard
);







const handleDragEnd=(event)=>{


const {

active,

over

}=event;



if(
!over ||
active.id===over.id
){

return;

}





const oldIndex =
widgets.findIndex(
item=>item.id===active.id
);



const newIndex =
widgets.findIndex(
item=>item.id===over.id
);






const updated =
arrayMove(
widgets,
oldIndex,
newIndex
);





dispatch(
reorderWidgets(updated)
);




saveDashboardLayout(
updated
);



};









return (


<DndContext


collisionDetection={closestCenter}


onDragEnd={handleDragEnd}


>


<SortableContext


items={
widgets
.filter(
w=>w.enabled
)
.map(
w=>w.id
)
}


strategy={
verticalListSortingStrategy
}


>




<div

className="
space-y-6
"

>


{

widgets

.filter(
widget=>widget.enabled
)


.map(widget=>(


<WidgetSortable

key={widget.id}

widget={widget}

>


<div

className="
bg-white
rounded-3xl
border
shadow-sm
p-5
"

>


<WidgetRenderer


id={widget.id}


data={dashboardData}


/>


</div>


</WidgetSortable>



))


}



</div>





</SortableContext>




</DndContext>


);


}