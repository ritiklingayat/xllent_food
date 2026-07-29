import React from "react";

import {
  Inbox,
} from "lucide-react";



const EmptyState = ({

  icon,

  title="No data found",

  description="There are no records available.",

  action,

}) => {



const Icon = icon || Inbox;



return (

<div

className="
flex
flex-col
items-center
justify-center
py-16
text-center
"

>


<div

className="
mb-4
flex
h-16
w-16
items-center
justify-center
rounded-full
bg-gray-100
"

>


<Icon

size={32}

className="
text-gray-400
"

/>


</div>





<h3

className="
text-lg
font-semibold
text-gray-800
"

>

{title}

</h3>





<p

className="
mt-2
max-w-sm
text-sm
text-gray-500
"

>

{description}

</p>





{
action &&

<button

onClick={action.onClick}

className="
mt-6
rounded-lg
bg-blue-600
px-5
py-2.5
text-sm
font-medium
text-white

hover:bg-blue-700

transition
"

>

{action.label}

</button>

}



</div>


);


};



export default EmptyState;