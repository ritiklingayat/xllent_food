export default function ProductTable({
products,
deleteProduct
}){


return (

<table className="
bg-white
w-full
">


<thead>

<tr>

<th>Name</th>

<th>Price</th>

<th>Stock</th>

<th>Action</th>


</tr>

</thead>


<tbody>


{
products.map(product=>(


<tr key={product.id}>


<td>
{product.name}
</td>


<td>
₹{product.price}
</td>


<td>
{product.stock}
</td>


<td>


<button

onClick={()=>deleteProduct(product.id)}

className="
text-red-600
">

Delete

</button>


</td>


</tr>


))

}



</tbody>


</table>

)

}