import AIInsightCard
from "./AIInsightCard";


import {
aiInsightData
}
from "../data/aiInsightData";




export default function RevenuePrediction(){


const data =
aiInsightData.revenuePrediction;



return (

<AIInsightCard


title={data.title}


value={data.prediction}


description={data.message}


confidence={data.confidence}


/>

);


}