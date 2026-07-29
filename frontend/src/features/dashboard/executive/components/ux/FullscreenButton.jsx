import {
Maximize
}
from "lucide-react";


const FullscreenButton=()=>{


const openFullscreen=()=>{


document
.getElementById(
"executive-dashboard"
)
.requestFullscreen();



};



return (

<button

onClick={openFullscreen}

className="p-3 rounded-xl bg-slate-100"

>

<Maximize size={20}/>

</button>

);


};


export default FullscreenButton;