import {
useDispatch
}
from "react-redux";


import {
openAI
}
from "./redux/aiChatSlice";


import {
Bot
}
from "lucide-react";




export default function AIChatAssistant(){


const dispatch=useDispatch();



return (

<button

onClick={()=>
dispatch(openAI())
}

className="
fixed
bottom-6
left-6
bg-orange-500
text-white
p-5
rounded-full
shadow-xl
"

>

<Bot/>

</button>

);

}