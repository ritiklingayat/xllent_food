import data
from "../data/advancedDashboardData";


export default function SalesLeaderboard(){


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

Top Sales Team

</h3>



{
data.salesTeam.map(
(person,index)=>(


<div
key={index}

className="
flex
justify-between
py-3
border-b
"
>


<span>

#{index+1}

{" "}

{person.name}

</span>


<strong>

{person.sales}

</strong>


</div>


))
}



</div>

)

}