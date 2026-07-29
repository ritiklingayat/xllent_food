export default function ImagePreview({

image,

onRemove

}){


if(!image)
return null;



return (

<div
className="
relative
w-40
h-40
"
>


<img

src={
typeof image==="string"
?
image
:
URL.createObjectURL(image)
}

alt="preview"

className="
w-full
h-full
object-cover
rounded-xl
border
"

/>



<button

type="button"

onClick={onRemove}

className="
absolute
top-2
right-2
bg-red-500
text-white
rounded-full
w-7
h-7
"

>

×

</button>


</div>

)

}