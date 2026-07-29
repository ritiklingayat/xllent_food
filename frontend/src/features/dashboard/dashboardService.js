import dashboardMockData
from "./data/dashboardMockData";



const dashboardService={


getDashboard:async(range="30D")=>{


return new Promise((resolve)=>{


setTimeout(()=>{


resolve({

...dashboardMockData,

range


});


},700);



});


}



};


export default dashboardService;