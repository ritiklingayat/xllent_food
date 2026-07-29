import {
useState
}
from "react";


import {
Mic,
Send
}
from "lucide-react";





export default function ChatInput({
onSend
}){


const [
text,
setText
]=useState("");





const startVoice=()=>{


const SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;



if(!SpeechRecognition){

alert(
"Voice input not supported"
);

return;

}



const recognition =
new SpeechRecognition();



recognition.lang =
"en-IN";



recognition.start();




recognition.onresult=(event)=>{


const voiceText =
event.results[0][0].transcript;



setText(voiceText);


};


};






const send=()=>{


if(!text.trim())
return;


onSend(text);


setText("");



};






return (

<div

className="
flex
gap-3
border-t
p-4
bg-white
"

>



<button

onClick={startVoice}

className="
rounded-xl
p-3
bg-slate-100
"

>


<Mic size={20}/>


</button>






<input


value={text}


onChange={
e=>setText(e.target.value)
}


onKeyDown={
e=>{

if(e.key==="Enter")
send();

}

}


placeholder="
Ask Xllent AI anything...
"


className="
flex-1
rounded-xl
border
px-4
outline-none
"


/>





<button


onClick={send}


className="
rounded-xl
bg-orange-500
text-white
px-5
"


>


<Send size={20}/>


</button>




</div>


);


}