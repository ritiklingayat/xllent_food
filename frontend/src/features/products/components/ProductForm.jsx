import {useState} from "react";
import ImageUpload from "./ImageUpload";
import MediaUploader
from "@/features/media/components/MediaUploader";

export default function ProductForm({
    initialData={},
    onSubmit
}){


const [form,setForm]=useState({

    name:"",
    category:"",
    price:"",
    stock:"",
    description:"",
    image:null,

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
space-y-6
bg-white
p-6
rounded-xl
shadow
">


<input

value={form.name}

onChange={
e=>updateField(
"name",
e.target.value
)}

placeholder="Product Name"

className="input"

/>



<input

value={form.price}

onChange={
e=>updateField(
"price",
e.target.value
)}

placeholder="Price"

className="input"

/>



<input

value={form.stock}

onChange={
e=>updateField(
"stock",
e.target.value
)}

placeholder="Stock Quantity"

className="input"

/>



<textarea

value={form.description}

onChange={
e=>updateField(
"description",
e.target.value
)}

placeholder="Description"

className="input"

/>



<ImageUpload

value={form.image}

onChange={
file=>updateField(
"image",
file
)
}

/>
<MediaUploader

onUpload={(images)=>{

updateField(
"images",
images
)

}}

multiple={true}

/>


<button

className="
bg-blue-600
text-white
px-5
py-2
rounded-lg
"

>

Save Product

</button>


</form>

)

}
