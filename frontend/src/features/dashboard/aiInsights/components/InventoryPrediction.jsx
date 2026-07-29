import AIInsightCard
from "./AIInsightCard";


import {
aiInsightData
}
from "../data/aiInsightData";




export default function InventoryPrediction(){


const data =
aiInsightData.inventoryRisk;



return (

<AIInsightCard


title={data.title}


value={`${data.productsAtRisk} Products`}


description={data.message}


confidence={data.confidence}


/>

);


}