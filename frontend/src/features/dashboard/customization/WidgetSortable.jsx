import React from "react";


import {

useSortable

}
from "@dnd-kit/sortable";


import {

CSS

}
from "@dnd-kit/utilities";





export default function WidgetSortable({

widget,

children

}){


const {


attributes,

listeners,

setNodeRef,

transform,

transition


}
=
useSortable({

id:widget.id

});





const style={


transform:
CSS.Transform.toString(transform),


transition


};





return (


<div


ref={setNodeRef}


style={style}


className="
relative
"



>



<button


{...attributes}


{...listeners}


className="
absolute
right-4
top-4
z-10
cursor-grab
text-slate-400
"

>


☷


</button>





{children}



</div>



);


}