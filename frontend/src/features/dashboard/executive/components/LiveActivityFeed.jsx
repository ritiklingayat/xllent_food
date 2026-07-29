import {
  motion
} from "framer-motion";


import {
  Clock,
  ShoppingCart,
  Package,
  UserPlus,
  IndianRupee,
  AlertTriangle,
  Activity
} from "lucide-react";


import {
  useSocket
} from "@/providers/SocketProvider";





const DEFAULT_EVENTS = [


{
id:1,
type:"order",
message:"New Order Received",
value:"Order #4582 from Mumbai",
time:"2 min ago"
},


{
id:2,
type:"inventory",
message:"Low Stock Alert",
value:"Premium Chicken Pack",
time:"8 min ago"
},


{
id:3,
type:"customer",
message:"New Customer Registered",
value:"Rahul Enterprises",
time:"15 min ago"
},


{
id:4,
type:"payment",
message:"Payment Received",
value:"₹85,000 transaction",
time:"22 min ago"
},


];








const EVENT_CONFIG={


order:{
icon:ShoppingCart,
color:"bg-blue-600"
},


inventory:{
icon:Package,
color:"bg-orange-500"
},


customer:{
icon:UserPlus,
color:"bg-green-600"
},


payment:{
icon:IndianRupee,
color:"bg-purple-600"
},


alert:{
icon:AlertTriangle,
color:"bg-red-600"
}


};







// SAFE DATE FORMATTER

const formatEventTime=(value)=>{


if(!value)
return "Now";



if(value instanceof Date){

return value.toLocaleTimeString(
"en-IN",
{
hour:"2-digit",
minute:"2-digit"
}
);

}



if(
typeof value === "string"
){

return value;

}



try{

return new Date(value)
.toLocaleTimeString(
"en-IN",
{
hour:"2-digit",
minute:"2-digit"
}
);


}

catch{

return "Now";

}


};









export default function LiveActivityFeed({

data

}){





let socketEvents=[];



try{


const socket =
useSocket?.();


socketEvents =
socket?.events || [];


}

catch{

socketEvents=[];

}








const events =

data ||

(
socketEvents.length
?
socketEvents
:
DEFAULT_EVENTS
);









return (


<motion.section


initial={{
opacity:0,
y:25
}}


animate={{
opacity:1,
y:0
}}



transition={{
duration:.5
}}



className="
rounded-3xl
border
border-slate-200
dark:border-slate-800
bg-white/80
dark:bg-slate-900/80
backdrop-blur-xl
shadow-xl
p-6
"

>





<div

className="
flex
justify-between
items-center
mb-6
"

>


<div>


<h2

className="
text-xl
font-bold
dark:text-white
"

>

Live Activity Stream ⚡

</h2>



<p

className="
text-sm
text-slate-500
dark:text-slate-400
"

>

Real-time business events

</p>


</div>




<div

className="
h-12
w-12
rounded-2xl
bg-gradient-to-br
from-blue-600
to-purple-600
flex
items-center
justify-center
text-white
"

>


<Activity size={24}/>


</div>


</div>








<div

className="
space-y-4
"

>


{

events.length===0

?

<div

className="
rounded-2xl
bg-slate-100
dark:bg-slate-800
p-5
text-center
text-slate-500
"

>

Waiting for realtime events...

</div>


:


events.map(

(event,index)=>{


const config =
EVENT_CONFIG[event.type]
||
EVENT_CONFIG.order;



const Icon =
config.icon;



return (


<motion.div


key={
event.id || index
}



initial={{
opacity:0,
x:30
}}


animate={{
opacity:1,
x:0
}}



transition={{
delay:index*.08
}}



className="
flex
items-center
justify-between
gap-4
rounded-2xl
bg-slate-100
dark:bg-slate-800
p-4
"

>





<div

className="
flex
items-center
gap-4
"

>


<div

className={`
h-11
w-11
rounded-xl
${config.color}
flex
items-center
justify-center
text-white
shadow-lg
`}

>

<Icon size={20}/>

</div>





<div>


<h3

className="
font-semibold
dark:text-white
"

>

{event.message || "Activity"}

</h3>



<p

className="
text-sm
text-slate-500
dark:text-slate-400
"

>

{event.value || "-"}

</p>


</div>



</div>








<div

className="
flex
items-center
gap-2
text-xs
text-slate-400
"

>


<Clock size={14}/>


{

formatEventTime(
event.time
)

}


</div>





</motion.div>


)


}


)


}


</div>







</motion.section>


);

}