import React, {
  useEffect,
  useState
} from "react";


export default function ProductDrawer({

  open,

  onClose,

  onSave,

  product

}) {



const emptyForm = {

  productName:"",

  description:"",

  categoryId:"",

  image:"",

  mrp:"",

  gst:"",

  superStockistPrice:"",

  distributorPrice:"",

  shopPrice:"",

  piecesPerPacket:"",

  packetsPerCarton:"",

  stock:"",

  status:"Active"

};




const [form,setForm]=useState(emptyForm);


const [categories,setCategories]=useState([]);


const [imagePreview,setImagePreview]=useState("");





// Load Categories

useEffect(()=>{


const data =

JSON.parse(

localStorage.getItem(
"xllent_categories"
)

)

||

[];


setCategories(data);


},[]);






// Edit Mode

useEffect(()=>{


if(product){


setForm(product);


setImagePreview(

product.image || ""

);


}

else{


setForm(emptyForm);


setImagePreview("");

}


},[product,open]);








const handleChange=(e)=>{


const {

name,

value

}=e.target;



setForm({

...form,

[name]:value

});


};







// Image Upload

const handleImageChange=(e)=>{


const file=e.target.files[0];


if(!file)

return;



const reader=new FileReader();



reader.onloadend=()=>{


setImagePreview(reader.result);



setForm({

...form,

image:reader.result

});


};



reader.readAsDataURL(file);



};









// Save

const handleSave=()=>{


if(!form.productName.trim()){


alert(
"Product Name is required"
);


return;


}



const productData={


...form,



mrp:Number(form.mrp || 0),



gst:Number(form.gst || 0),



superStockistPrice:

Number(
form.superStockistPrice || 0
),



distributorPrice:

Number(
form.distributorPrice || 0
),



shopPrice:

Number(
form.shopPrice || 0
),



piecesPerPacket:

Number(
form.piecesPerPacket || 0
),



packetsPerCarton:

Number(
form.packetsPerCarton || 0
),



stock:

Number(
form.stock || 0
),



};



onSave(productData);


};








if(!open)

return null;







return (

<div className="
fixed
inset-0
z-50
flex
justify-end
">


<div

onClick={onClose}

className="
absolute
inset-0
bg-black/40
"

/>





<div className="
relative
w-full
max-w-xl
bg-white
h-full
shadow-2xl
flex
flex-col
">






{/* Header */}

<div className="
p-6
border-b
">


<h2 className="
text-2xl
font-black
">

{

product

?

"Edit Product"

:

"Add Product"

}


</h2>


</div>







{/* Body */}

<div className="
flex-1
overflow-y-auto
p-6
space-y-5
">





<input

name="productName"

value={form.productName}

onChange={handleChange}

placeholder="Product Name"

className="
w-full
border
rounded-xl
p-3
"

/>






<textarea

name="description"

value={form.description}

onChange={handleChange}

placeholder="Description"

rows="4"

className="
w-full
border
rounded-xl
p-3
"

/>








<select

name="categoryId"

value={form.categoryId}

onChange={handleChange}

className="
w-full
border
rounded-xl
p-3
"

>

<option value="">

Select Category

</option>


{

categories.map(category=>(


<option

key={category.id}

value={category.id}

>

{category.name}

</option>


))

}


</select>







{/* Image */}


<div>


<label className="
font-semibold
block
mb-2
">

Product Image

</label>



{

imagePreview &&

<img

src={imagePreview}

alt="preview"

className="
w-32
h-32
object-cover
rounded-xl
mb-3
"

/>


}



<input

type="file"

accept="image/*"

onChange={handleImageChange}

/>


</div>








<select

name="status"

value={form.status}

onChange={handleChange}

className="
w-full
border
rounded-xl
p-3
"

>


<option value="Active">

Active

</option>


<option value="Inactive">

Inactive

</option>


</select>








<h3 className="
text-lg
font-bold
mt-5
">

Pricing Details

</h3>







<input

name="mrp"

type="number"

value={form.mrp}

onChange={handleChange}

placeholder="MRP"

className="
w-full
border
rounded-xl
p-3
"

/>





<input

name="gst"

type="number"

value={form.gst}

onChange={handleChange}

placeholder="GST %"

className="
w-full
border
rounded-xl
p-3
"

/>







<input

name="superStockistPrice"

type="number"

value={form.superStockistPrice}

onChange={handleChange}

placeholder="Super Stockist Carton Price"

className="
w-full
border
rounded-xl
p-3
"

/>








<input

name="distributorPrice"

type="number"

value={form.distributorPrice}

onChange={handleChange}

placeholder="Distributor Carton Price"

className="
w-full
border
rounded-xl
p-3
"

/>







<input

name="shopPrice"

type="number"

value={form.shopPrice}

onChange={handleChange}

placeholder="Shop Packet Price"

className="
w-full
border
rounded-xl
p-3
"

/>







<h3 className="
text-lg
font-bold
mt-5
">

Packaging

</h3>






<input

name="piecesPerPacket"

type="number"

value={form.piecesPerPacket}

onChange={handleChange}

placeholder="Pieces Per Packet"

className="
w-full
border
rounded-xl
p-3
"

/>







<input

name="packetsPerCarton"

type="number"

value={form.packetsPerCarton}

onChange={handleChange}

placeholder="Packets Per Carton"

className="
w-full
border
rounded-xl
p-3
"

/>







<input

name="stock"

type="number"

value={form.stock}

onChange={handleChange}

placeholder="Available Cartons"

className="
w-full
border
rounded-xl
p-3
"

/>





</div>









{/* Footer */}


<div className="
border-t
p-5
flex
justify-end
gap-3
">


<button

onClick={onClose}

className="
px-5
py-3
rounded-xl
border
"

>

Cancel

</button>






<button

onClick={handleSave}

className="
px-6
py-3
rounded-xl
bg-orange-500
text-white
font-bold
"

>

{

product

?

"Update Product"

:

"Save Product"

}


</button>



</div>






</div>


</div>


);


}