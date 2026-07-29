import {useState} from "react";


export default function CategoryForm({

initialData={},

onSubmit

}){


const [form,setForm]=useState({

name:"",
description:"",
status:"active",

...initialData

});



const updateField=(key,value)=>{

setForm(prev=>({

...prev,

[key]:value

}));

};



const submitHandler=(e)=>{

e.preventDefault();

onSubmit(form);

};



return (

<form

onSubmit={submitHandler}

className="
bg-white
rounded-xl
shadow
p-6
space-y-5
"


>


<input

type="text"

placeholder="Category Name"

value={form.name}

onChange={
e=>
updateField(
"name",
e.target.value
)
}

className="input"

/>



<textarea

placeholder="Category Description"

value={form.description}

onChange={
e=>
updateField(
"description",
e.target.value
)
}

className="input"

/>



<select

value={form.status}

onChange={
e=>
updateField(
"status",
e.target.value
)
}

className="input"

>


<option value="active">
Active
</option>


<option value="inactive">
Inactive
</option>


</select>



<button

className="
bg-blue-600
text-white
px-5
py-2
rounded-lg
"

>

Save Category

</button>


</form>

)

}