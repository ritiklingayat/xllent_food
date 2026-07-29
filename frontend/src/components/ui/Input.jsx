import React from "react";


export default function Input({
label,
value,
onChange,
placeholder,
type="text"
}){


return (

<div className="mb-4">


<label className="block mb-2 font-medium">

{label}

</label>



<input

type={type}

value={value}

placeholder={placeholder}

onChange={onChange}

className="
w-full
border
rounded-lg
px-4
py-3
outline-none
focus:ring-2
focus:ring-blue-500
"

/>


</div>


)

}