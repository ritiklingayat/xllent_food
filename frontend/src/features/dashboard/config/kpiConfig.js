import {
  IndianRupee,
  ShoppingCart,
  Package,
  Users
} from "lucide-react";



const kpiConfig=[


{
 id:"revenue",

 title:"Total Revenue",

 key:"revenue",

 prefix:"₹",

 icon:IndianRupee,

 trend:"+12.5%",

 trendType:"success",

 description:"Monthly revenue"

},



{
 id:"orders",

 title:"Total Orders",

 key:"orders",

 icon:ShoppingCart,

 trend:"+8.2%",

 trendType:"success",

 description:"Orders processed"

},



{
 id:"products",

 title:"Products",

 key:"products",

 icon:Package,

 trend:"+24",

 trendType:"info",

 description:"Active products"

},



{
 id:"customers",

 title:"Customers",

 key:"customers",

 icon:Users,

 trend:"+15",

 trendType:"success",

 description:"Registered customers"

}


];


export default kpiConfig;