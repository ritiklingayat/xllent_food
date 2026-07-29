import {
useState
}
from "react";


import {
Send
}
from "lucide-react";



const CopilotInput=({
onSend
})=>{


const [value,setValue]=useState("");



const submit=(e)=>{


e.preventDefault();


onSend(value);


setValue("");

};



return (

<form

onSubmit={submit}

className="
p-4
border-t
dark:border-slate-700
flex
gap-2
"

>


<input


value={value}


onChange={
e=>setValue(e.target.value)
}


placeholder="Ask AI about business..."

className="
flex-1
rounded-xl
px-4
py-3
bg-slate-100
dark:bg-slate-800
outline-none
text-sm
"


/>



<button

className="
rounded-xl
bg-blue-600
text-white
px-4
"

>

<Send size={18}/>

</button>


</form>


);


};



export default CopilotInput;