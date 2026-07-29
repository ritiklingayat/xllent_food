import AIInsightCard
from "./AIInsightCard";


import {
aiInsightData
}
from "../data/aiInsightData";



export default function SalesRecommendation(){


const data =
aiInsightData.salesRecommendation;



return (

<AIInsightCard


title={data.title}


value={data.product}


description={data.action}


confidence={data.confidence}


/>

);


}