import {
useState
}
from "react";


import {
motion,
AnimatePresence
}
from "framer-motion";


import {
Bot,
X,
Sparkles
}
from "lucide-react";


import CopilotMessage
from "./CopilotMessage";


import CopilotInput
from "./CopilotInput";


import AIQuickActions
from "./AIQuickActions";



const ExecutiveCopilot =()=>{


const [open,setOpen]=useState(false);



const [messages,setMessages]=useState([

{
id:1,
role:"ai",
text:"Hello 👋 I am your AI Executive Copilot. Ask me about sales, revenue, inventory or business insights."
}

]);





const generateResponse=(question)=>{


let answer="";


if(question.toLowerCase().includes("revenue")){

answer=
"📈 Revenue is trending upward. Current prediction shows +18% growth next month.";

}


else if(question.toLowerCase().includes("sales")){


answer=
"🔥 Top performing products are increasing sales velocity. Consider increasing inventory.";

}


else if(question.toLowerCase().includes("customer")){


answer=
"👥 Customer engagement is healthy. Premium customers contribute maximum revenue.";

}


else if(question.toLowerCase().includes("stock")){


answer=
"📦 Inventory health is 94%. Some products require restocking.";

}


else{


answer=
"🤖 I analyzed your dashboard data. Business performance looks stable with positive growth indicators.";

}



return answer;


};






const sendMessage=(text)=>{


if(!text.trim())
return;



const userMessage={

id:Date.now(),

role:"user",

text

};



setMessages(prev=>[

...prev,

userMessage

]);




setTimeout(()=>{


setMessages(prev=>[

...prev,

{

id:Date.now(),

role:"ai",

text:generateResponse(text)

}

]);


},800);



};






return (

<>


{/* Floating Button */}

<motion.button


whileHover={{
scale:1.1
}}


whileTap={{
scale:.95
}}


onClick={()=>setOpen(!open)}


className="
fixed
bottom-6
right-6
z-50
h-16
w-16
rounded-full
bg-gradient-to-br
from-blue-600
to-purple-600
text-white
shadow-2xl
flex
items-center
justify-center
"


>


{

open

?

<X size={28}/>

:

<Bot size={28}/>

}


</motion.button>






<AnimatePresence>


{

open && (


<motion.div


initial={{
opacity:0,
y:40,
scale:.95
}}


animate={{
opacity:1,
y:0,
scale:1
}}


exit={{
opacity:0,
y:40
}}


className="
fixed
bottom-24
right-6
z-50
w-[360px]
max-w-[90vw]
rounded-3xl
border
border-white/20
bg-white/80
dark:bg-slate-900/90
backdrop-blur-xl
shadow-2xl
overflow-hidden
"


>


{/* Header */}


<div

className="
p-5
bg-gradient-to-r
from-blue-600
to-purple-600
text-white
flex
justify-between
items-center
"

>


<div className="
flex
items-center
gap-3
">


<Sparkles/>

<div>

<h3 className="
font-bold
">

AI Executive Copilot

</h3>

<p className="
text-xs
opacity-80
">

Business Intelligence Assistant

</p>


</div>


</div>


</div>









{/* Messages */}


<div

className="
h-80
overflow-y-auto
p-4
space-y-3
"

>


{

messages.map(message=>(

<CopilotMessage

key={message.id}

message={message}

/>

))

}


</div>







<AIQuickActions

onAction={sendMessage}

/>





<CopilotInput

onSend={sendMessage}

/>





</motion.div>


)


}


</AnimatePresence>


</>


);


};



export default ExecutiveCopilot;