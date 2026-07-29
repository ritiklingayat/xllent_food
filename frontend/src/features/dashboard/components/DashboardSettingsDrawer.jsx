import React from "react";


import {

    Settings,

    X,

    RotateCcw,

    GripVertical

}
from "lucide-react";



import {

    useDispatch,

    useSelector

}
from "react-redux";



import {

    toggleDrawer,

    toggleWidget,

    resetLayout,

    enableCustomization,

    disableCustomization

}
from "../customization/dashboardLayoutSlice";



import {

    clearDashboardLayout

}
from "../customization/layoutStorage";






export default function DashboardSettingsDrawer(){



    const dispatch =
    useDispatch();




    const {


        drawerOpen,

        widgets = [],

        customizationMode = false


    } = useSelector(
        state=>state.dashboardLayout
    );







    const toggleMode=()=>{


        if(customizationMode){


            dispatch(
                disableCustomization()
            );


        }
        else{


            dispatch(
                enableCustomization()
            );


        }


    };







    const handleReset=()=>{


        dispatch(
            resetLayout()
        );


        clearDashboardLayout();


    };








return (

<>



{/* Floating Button */}


<button


onClick={()=>
dispatch(toggleDrawer())
}


className="
fixed
right-6
bottom-6
z-40
flex
items-center
gap-2
rounded-full
bg-orange-500
px-6
py-3
text-white
font-bold
shadow-xl
hover:scale-105
transition
"


>


<Settings size={20}/>


Customize


</button>








{/* Overlay */}


{

drawerOpen && (


<div


onClick={()=>
dispatch(toggleDrawer())
}


className="
fixed
inset-0
bg-black/40
backdrop-blur-sm
z-40
"


/>


)

}









{/* Drawer */}


<aside


className={`

fixed

top-0

right-0

h-full

w-full

sm:w-[420px]

bg-white

z-50

shadow-2xl

transition-transform

duration-300


${
drawerOpen

?

"translate-x-0"

:

"translate-x-full"

}

`}


>







{/* Header */}


<div


className="
flex
justify-between
items-center
p-6
border-b
"


>


<div>


<h2

className="
text-xl
font-black
text-slate-800
"

>

Dashboard Settings

</h2>



<p

className="
text-sm
text-slate-500
"

>

Customize ERP widgets

</p>


</div>





<button


onClick={()=>
dispatch(toggleDrawer())
}


className="
p-2
rounded-lg
hover:bg-slate-100
"


>

<X/>


</button>



</div>









{/* Content */}



<div


className="
p-6
space-y-6
overflow-y-auto
h-[calc(100%-140px)]
"


>







{/* Drag Mode */}



<div


className="
flex
justify-between
items-center
bg-orange-50
rounded-2xl
p-4
"


>


<div>


<h3

className="
font-bold
text-slate-800
"

>

Drag & Drop Mode

</h3>



<p

className="
text-xs
text-slate-500
"

>

Reorder dashboard widgets

</p>


</div>





<button


onClick={toggleMode}



className={`

px-4

py-2

rounded-xl

font-bold

text-sm


${
customizationMode

?

"bg-green-500 text-white"

:

"bg-slate-200 text-slate-700"

}

`}


>


{

customizationMode

?

"ON"

:

"OFF"

}


</button>




</div>









{/* Widget List */}



<div>


<h3

className="
font-bold
text-slate-700
mb-4
"

>

Widgets

</h3>





<div

className="
space-y-3
"

>


{

widgets.map(widget=>(


<div


key={widget.id}


className="
flex
items-center
justify-between
border
rounded-2xl
p-4
"


>


<div

className="
flex
items-center
gap-3
"

>


<GripVertical

size={18}

className="
text-slate-400
"

/>




<div>


<p

className="
font-semibold
text-slate-800
"

>

{widget.title}

</p>


<p

className="
text-xs
text-slate-400
"

>

{widget.id}

</p>


</div>



</div>








<button


onClick={()=>


dispatch(
toggleWidget(widget.id)
)


}



className={`

px-4

py-2

rounded-xl

text-xs

font-bold


${
widget.enabled

?

"bg-orange-500 text-white"

:

"bg-slate-200 text-slate-600"

}

`}


>


{

widget.enabled

?

"Visible"

:

"Hidden"

}


</button>




</div>


))


}



</div>


</div>







</div>









{/* Footer */}



<div


className="
absolute
bottom-0
left-0
right-0
bg-white
border-t
p-5
"


>


<button


onClick={handleReset}



className="
w-full
flex
justify-center
items-center
gap-2
rounded-xl
bg-slate-900
text-white
py-3
font-bold
hover:bg-slate-800
transition
"


>


<RotateCcw size={18}/>


Reset Default Layout


</button>



</div>







</aside>




</>


);


}