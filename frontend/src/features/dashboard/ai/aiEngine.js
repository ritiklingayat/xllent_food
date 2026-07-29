import {
    aiMockData
}
from "../data/aiMockData";



export function generateAIResponse(question){


const query =
question.toLowerCase();





if(
query.includes("sales")
||
query.includes("revenue")
){


return {

type:"analytics",

message:

`Today's estimated sales are ₹${

aiMockData.salesForecast.next7Days

}. Growth prediction is ${

aiMockData.salesForecast.growth

}%.`

};


}






if(

query.includes("stock")

||
query.includes("inventory")

||
query.includes("reorder")

){


const lowStock =

aiMockData.stockPrediction

.filter(
item =>
item.prediction==="LOW"
);



return {


type:"inventory",

message:

`These products need attention: ${
lowStock
.map(
item=>item.product
)
.join(", ")
}`


};



}







if(

query.includes("profit")

){


return {


type:"profit",

message:

"AI detected packaging cost increase affecting profit margins. Review supplier pricing."


};


}







return {


type:"general",

message:

"I analyzed your ERP data. Ask about sales, inventory, profit or products."

};


}