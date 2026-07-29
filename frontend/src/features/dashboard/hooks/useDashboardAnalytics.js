import {
useSelector
}
from "react-redux";


import {

selectDashboard,

selectDashboardStats,

selectLoading,

selectError

}
from "../dashboardSelectors";




export default function useDashboardAnalytics(){


const dashboard =
useSelector(
selectDashboard
);



const stats =
useSelector(
selectDashboardStats
);



const loading =
useSelector(
selectLoading
);



const error =
useSelector(
selectError
);



return {


stats,


salesTrend:
dashboard.salesTrend,


orderStatus:
dashboard.orderStatus,


topProducts:
dashboard.topProducts,


recentOrders:
dashboard.recentOrders,


lowStock:
dashboard.lowStock,


loading,


error


};


}