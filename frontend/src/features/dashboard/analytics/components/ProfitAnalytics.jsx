export default function ProfitAnalytics({
    data={}
}){


return (

<div

className="
rounded-3xl
bg-gradient-to-br
from-emerald-500
to-green-700
text-white
p-6
shadow-xl
"

>


<h2

className="
text-xl
font-black
"

>

Profit Analytics

</h2>




<div

className="
mt-6
space-y-4
"

>


<div>

<p className="text-green-100">

Gross Profit

</p>

<h3 className="text-3xl font-black">

₹ {data.gross || 0}

</h3>

</div>




<div>

<p className="text-green-100">

Net Profit

</p>

<h3 className="text-3xl font-black">

₹ {data.net || 0}

</h3>

</div>





<div>

<p className="text-green-100">

Profit Margin

</p>

<h3 className="text-3xl font-black">

{data.margin || 0} %

</h3>

</div>



</div>


</div>


);


}