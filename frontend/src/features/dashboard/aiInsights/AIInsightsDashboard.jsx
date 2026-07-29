import RevenuePrediction
from "./components/RevenuePrediction";


import InventoryPrediction
from "./components/InventoryPrediction";


import SalesRecommendation
from "./components/SalesRecommendation";


import AIAnalyticsChart
from "./components/AIAnalyticsChart";





export default function AIInsightsDashboard(){


return (

<div

className="
space-y-6
"

>


<div

className="
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-3
gap-6
"

>


<RevenuePrediction/>


<InventoryPrediction/>


<SalesRecommendation/>


</div>





<AIAnalyticsChart/>


</div>

);


}