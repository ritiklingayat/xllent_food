export const aiPermissions={



SUPER_ADMIN:[

"sales",

"inventory",

"orders",

"customers",

"finance",

"reports"

],




ADMIN:[

"sales",

"inventory",

"orders",

"reports"

],





SUPERSTOCKIEST:[

"inventory",

"sales",

"orders"

],






DISTRIBUTOR:[

"inventory",

"sales",

"orders"

],





ASM:[

"sales",

"orders"

],





SO:[

"orders"

]



};







export function canUseAI(
role,
feature
){


const permissions =
aiPermissions[role]
||
[];



return permissions.includes(
feature
);


}