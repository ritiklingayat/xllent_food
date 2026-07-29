export default function ChatMessage({
message
}){


const isAI =
message.role==="assistant";



return (

<div

className={`
flex
mb-4

${

isAI
?
"justify-start"
:
"justify-end"

}

`}

>


<div

className={`
max-w-[75%]
rounded-2xl
px-5
py-3
text-sm
whitespace-pre-line


${

isAI

?

"bg-slate-100 text-slate-800"

:

"bg-orange-500 text-white"

}

`}

>


{message.content}


</div>


</div>

);


}