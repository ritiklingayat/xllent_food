import React from "react";


import {
useSelector
}
from "react-redux";



export default function StockPrediction(){


const data =
useSelector(
state=>state.ai.insights.stockPrediction
);



return (

<div

className="
bg-white
rounded-3xl
border
p-6
"

>


<h2

className="
font-black
text-xl
mb-5
"

>

AI Stock Prediction

</h2>



{

data.map(item=>(


<div

key={item.product}

className="
flex
justify-between
border-b
py-3
"

>


<span>

{item.product}

</span>



<span

className={

item.prediction==="LOW"

?
"text-red-500 font-bold"
:
"text-green-500 font-bold"

}

>

{item.prediction}

</span>


</div>


))


}



</div>


);


}