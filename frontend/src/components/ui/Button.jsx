import React from "react";


export default function Button({
children,
onClick,
type="button",
variant="primary"
}){


const styles={

primary:
"bg-blue-600 text-white hover:bg-blue-700",

danger:
"bg-red-600 text-white",

secondary:
"bg-gray-200 text-gray-800"

};


return (

<button

type={type}

onClick={onClick}

className={`
px-5
py-2
rounded-lg
font-medium
transition
${styles[variant]}
`}

>

{children}

</button>

)

}