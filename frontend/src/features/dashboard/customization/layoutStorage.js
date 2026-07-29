const STORAGE_KEY =
"XLLENT_DASHBOARD_LAYOUT";



export const saveDashboardLayout = (layout)=>{


localStorage.setItem(

STORAGE_KEY,

JSON.stringify(layout)

);


};





export const getDashboardLayout = ()=>{


const data =

localStorage.getItem(
STORAGE_KEY
);



if(!data){

return null;

}



try{


return JSON.parse(data);


}

catch(error){


console.error(
"Dashboard layout load failed",
error
);


return null;


}


};





export const clearDashboardLayout = ()=>{


localStorage.removeItem(
STORAGE_KEY
);


};