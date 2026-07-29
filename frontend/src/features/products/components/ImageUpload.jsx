import {useState} from "react";


export default function ImageUpload({setImage}){


const [preview,setPreview]=useState();


const upload=(e)=>{

const file=e.target.files[0];


const url=
URL.createObjectURL(file);


setPreview(url);

setImage(url);


};


return (

<div>

<input
type="file"
accept="image/*"
onChange={upload}
/>


{
preview &&
<img
src={preview}
className="
w-32
h-32
mt-3
rounded-lg
object-cover
"
/>

}


</div>

)

}