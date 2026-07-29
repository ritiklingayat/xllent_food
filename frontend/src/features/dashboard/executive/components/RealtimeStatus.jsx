import {
Wifi,
WifiOff
}
from "lucide-react";


import {
useSocket
}
from "@/providers/SocketProvider";



const RealtimeStatus=()=>{


const {
connected
}=useSocket();



return (

<div

className="
flex
items-center
gap-3
px-4
py-3
rounded-2xl
bg-white/80
dark:bg-slate-900/80
shadow-lg
"

>


{
connected?


<>

<Wifi
className="text-green-500"
/>

<span className="
text-green-600
font-semibold
">

LIVE


</span>

</>


:


<>

<WifiOff/>

Offline


</>

}


</div>


);


};


export default RealtimeStatus;