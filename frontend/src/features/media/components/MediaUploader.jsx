import {
useState
}
from "react";


import ImagePreview
from "./ImagePreview";


import {
mediaService
}
from "../services/mediaService";



export default function MediaUploader({

onUpload,

multiple=false

}){


const [images,setImages]=useState([]);

const [loading,setLoading]=useState(false);



function handleSelect(e){


const files =
Array.from(
e.target.files
);



setImages(files);


}



async function upload(){


try{


setLoading(true);



const uploaded=[];



for(const file of images){


const result =
await mediaService.uploadImage(
file
);


uploaded.push(result);


}



onUpload(uploaded);



}

finally{


setLoading(false);


}


}



return (

<div

className="
space-y-5
"

>


<input

type="file"

accept="image/*"

multiple={multiple}

onChange={handleSelect}

/>



<div

className="
flex
gap-4
flex-wrap
"

>


{

images.map(
(image,index)=>(


<ImagePreview

key={index}

image={image}

onRemove={()=>

setImages(
prev=>
prev.filter(
(_,i)=>i!==index
)
)

}

/>


))

}


</div>



<button

disabled={loading}

onClick={upload}

className="
bg-blue-600
text-white
px-5
py-2
rounded-lg
"

>


{
loading
?
"Uploading..."
:
"Upload Image"
}


</button>



</div>

)

}