import data
from "../data/advancedDashboardData";


export default function InventoryHealth(){


return (

<div
className="
rounded-3xl
bg-gradient-to-br
from-green-500
to-emerald-600
p-6
text-white
"
>


<h3
className="
text-xl
font-black
"
>

Inventory Health

</h3>


<div
className="
text-6xl
font-black
mt-5
"
>

{data.inventoryHealth}%

</div>


<p
className="
mt-3
text-green-100
"
>

Healthy Stock Level

</p>


</div>

)

}