export default function Select({
label,
value,
onChange,
options=[]
}){


return (

<div className="mb-4">


<label className="block mb-2 font-medium">

{label}

</label>


<select

value={value}

onChange={onChange}

className="
w-full
border
rounded-lg
px-4
py-3
"

>


{
options.map(option=>

<option
key={option.value}
value={option.value}
>

{option.label}

</option>

)

}


</select>


</div>


)

}