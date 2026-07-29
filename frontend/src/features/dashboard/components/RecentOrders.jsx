export default function RecentOrders({orders}){


return (

<div className="
bg-white
rounded-xl
border
shadow-sm
p-5
">


<h2 className="
text-xl
font-semibold
mb-5
">

Recent Orders

</h2>



<div className="overflow-x-auto">


<table className="
w-full
">


<thead>

<tr className="
border-b
text-left
text-gray-500
">


<th className="p-3">
Customer
</th>

<th>
Product
</th>

<th>
Amount
</th>

<th>
Status
</th>


</tr>

</thead>


<tbody>


{
orders.map(order=>(


<tr
key={order.id}
className="
border-b
"
>


<td className="p-3">
{order.customer}
</td>


<td>
{order.product}
</td>


<td>
{order.amount}
</td>


<td>

<span className="
px-3
py-1
rounded-full
bg-green-100
text-green-700
text-sm
">

{order.status}

</span>

</td>


</tr>


))
}



</tbody>



</table>



</div>


</div>


)

}