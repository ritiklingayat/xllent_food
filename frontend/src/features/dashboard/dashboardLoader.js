import dashboardMockData
from "./data/dashboardMockData";



export async function loadDashboardData(){


return new Promise(
(resolve)=>{


setTimeout(()=>{


resolve(
dashboardMockData
);


},800);



});


}