export default function RecentOrdersTable(){


const orders=[

{
id:"ORD001",
customer:"ABC Store",
amount:"₹4500",
status:"Delivered"
}

];


return (

<div
className="
bg-white
rounded-3xl
border
p-6
"
>

<h3
className="
font-black
text-xl
mb-5
"
>

Recent Orders

</h3>


<table
className="
w-full
"
>

<tbody>

{
orders.map(order=>(

<tr
key={order.id}
className="
border-b
"
>

<td>
{order.id}
</td>

<td>
{order.customer}
</td>

<td>
{order.amount}
</td>

<td>
{order.status}
</td>


</tr>

))
}


</tbody>

</table>


</div>

)

}