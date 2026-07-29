const ACTIONS=[

"Analyze revenue",

"Top selling products",

"Customer insights",

"Check inventory"

];



const AIQuickActions=({
onAction
})=>{


return (

<div

className="
p-3
flex
gap-2
overflow-x-auto
"

>


{

ACTIONS.map(action=>(


<button


key={action}


onClick={()=>onAction(action)}


className="
whitespace-nowrap
px-3
py-2
rounded-xl
text-xs
bg-blue-50
dark:bg-slate-800
dark:text-white
hover:bg-blue-100
transition
"

>

{action}


</button>


))


}


</div>


);


};



export default AIQuickActions;