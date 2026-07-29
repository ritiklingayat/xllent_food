import RevenueTargetChart
from "../components/RevenueTargetChart";

import AIExecutiveSummary
from "../components/AIExecutiveSummary";

import SalesFunnel
from "../components/SalesFunnel";

import RegionalSalesMap
from "../components/RegionalSalesMap";

import CustomerSegmentation
from "../components/CustomerSegmentation";

import TopProducts
from "../components/TopProducts";

import CashFlowWidget
from "../components/CashFlowWidget";

import ProfitMarginAnalytics
from "../components/ProfitMarginAnalytics";

import LiveActivityFeed
from "../components/LiveActivityFeed";



export default [

{
id:"revenue",
title:"Revenue Analytics",
component:
RevenueTargetChart
},


{
id:"ai",
title:"AI Summary",
component:
AIExecutiveSummary
},


{
id:"funnel",
title:"Sales Funnel",
component:
SalesFunnel
},


{
id:"regional",
title:"Regional Sales",
component:
RegionalSalesMap
},


{
id:"customers",
title:"Customers",
component:
CustomerSegmentation
},


{
id:"products",
title:"Top Products",
component:
TopProducts
},


{
id:"cashflow",
title:"Cash Flow",
component:
CashFlowWidget
},


{
id:"profit",
title:"Profit Analytics",
component:
ProfitMarginAnalytics
},


{
id:"activity",
title:"Live Activity",
component:
LiveActivityFeed
}

];