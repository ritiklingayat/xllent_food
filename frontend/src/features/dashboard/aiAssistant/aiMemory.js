/*
|--------------------------------------------------------------------------
| ERP AI Memory Engine
|--------------------------------------------------------------------------
*/


const MEMORY_KEY =
"xllent_ai_memory";





export function saveConversation(messages){


localStorage.setItem(

MEMORY_KEY,

JSON.stringify(messages)

);


}





export function loadConversation(){


const data =
localStorage.getItem(
MEMORY_KEY
);



return data
?
JSON.parse(data)
:
[];


}





export function clearConversation(){


localStorage.removeItem(
MEMORY_KEY
);


}