import {
NOTIFICATION_TYPES,
PRIORITY
}
from "./notificationTypes";



export const initialNotifications=[


{
id:1,

type:NOTIFICATION_TYPES.LOW_STOCK,

title:"Low Stock Alert",

message:
"Premium Basmati Rice stock is below minimum level",

priority:PRIORITY.HIGH,

read:false,

time:"2 min ago"

},



{
id:2,

type:NOTIFICATION_TYPES.NEW_ORDER,

title:"New Order Received",

message:
"Distributor order #XF10234 received",

priority:PRIORITY.MEDIUM,

read:false,

time:"10 min ago"

},




{
id:3,

type:NOTIFICATION_TYPES.TARGET_ACHIEVED,

title:"Sales Target Achieved",

message:
"ASM Rahul achieved monthly target",

priority:PRIORITY.LOW,

read:true,

time:"1 hour ago"

}


];