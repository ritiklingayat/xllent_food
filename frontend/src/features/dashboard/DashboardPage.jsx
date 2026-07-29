import { useEffect } from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";


// Components

import DashboardHeader
from "./components/DashboardHeader";


import DashboardKPICards
from "./components/DashboardKPICards";


import DashboardGrid
from "./components/DashboardGrid";


import DashboardSettingsDrawer
from "./components/DashboardSettingsDrawer";


import DashboardSkeleton
from "./components/skeleton/DashboardSkeleton";


import DashboardError
from "./components/DashboardError";


// Analytics

import AdvancedAnalytics
from "./components/AdvancedAnalytics";


import AIInsightsDashboard
from "./aiInsights/AIInsightsDashboard";


// AI

import AIAssistantButton
from "./aiAssistant/components/AIAssistantButton";


import AIAssistantDrawer
from "./aiAssistant/components/AIAssistantDrawer";


// Redux

import {
 fetchDashboard
}
from "./dashboardSlice";


import {
 setWidgetsByRole
}
from "./customization/dashboardLayoutSlice";


import {
 getWidgetsForRole
}
from "./permissions/widgetPermissions";




export default function DashboardPage(){


const dispatch = useDispatch();



const {

loading,

error,

dateRange

} = useSelector(
state => state.dashboard || {}
);



const role =
localStorage.getItem("userRole")
||
"SUPER_ADMIN";




useEffect(()=>{


dispatch(

setWidgetsByRole(

getWidgetsForRole(role)

)

);


},[
dispatch,
role
]);






const loadDashboard = ()=>{


dispatch(

fetchDashboard(

dateRange?.type || "30D"

)

);


};





useEffect(()=>{


loadDashboard();


},[]);






if(loading){

return <DashboardSkeleton/>;

}






if(error){

return (

<DashboardError

message={error}

onRetry={loadDashboard}

/>

);

}






return (

<div

className="
min-h-screen
space-y-8
pb-24
"

>



{/* HEADER */}

<DashboardHeader

onRefresh={loadDashboard}

/>






{/* KPI */}

<DashboardKPICards/>






{/* ANALYTICS */}

<AdvancedAnalytics/>







{/* AI INSIGHTS */}

<AIInsightsDashboard/>







{/* MAIN DASHBOARD WIDGET ENGINE */}

<DashboardGrid/>







{/* SETTINGS */}

<DashboardSettingsDrawer/>







{/* AI ASSISTANT */}

<AIAssistantButton/>

<AIAssistantDrawer/>




</div>

);

}