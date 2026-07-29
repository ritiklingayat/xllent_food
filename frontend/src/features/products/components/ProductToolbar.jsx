export default function ProductToolbar({
search,
setSearch,
onAdd
}){


return (

<div className="
flex justify-between
bg-white
p-4
rounded-xl
shadow
">


<input

value={search}

onChange={
e=>setSearch(e.target.value)
}

placeholder="Search products..."

className="
border
rounded-lg
px-4
py-2
w-80
"

/>



<button

onClick={onAdd}

className="
bg-blue-600
text-white
px-5
py-2
rounded-lg
">

+ Add Product

</button>



</div>

)

}