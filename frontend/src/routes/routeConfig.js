import { lazy } from "react";


/*
|--------------------------------------------------------------------------
| Lazy Loaded Pages
|--------------------------------------------------------------------------
*/


// Public

const HomePage =
lazy(() =>
  import("@/pages/HomePage")
);


// Auth

const LoginPage =
lazy(() =>
  import("@/features/auth/Login")
);


// Dashboard

const DashboardPage =
lazy(() =>
  import("@/pages/dashboard/DashboardPage")
);


// Errors

const NotFoundPage =
lazy(() =>
  import("@/pages/errors/NotFoundPage")
);


/*
|--------------------------------------------------------------------------
| Application Route Registry
|--------------------------------------------------------------------------
*/


const routeConfig = [



/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

{
path:"/",

type:"public",

element:HomePage

},



/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
*/


{
path:"/login",

type:"guest",

element:LoginPage

},



/*
|--------------------------------------------------------------------------
| Protected Dashboard Routes
|--------------------------------------------------------------------------
*/


{
path:"/dashboard",

type:"protected",

layout:"dashboard",

roles:[

"SUPER_ADMIN",
"ADMIN",
"SUPER_STOCKIST",
"DISTRIBUTOR",
"WHOLESALER"

],

element:DashboardPage

},



/*
|--------------------------------------------------------------------------
| Product Management
|--------------------------------------------------------------------------
*/


{
path:"/dashboard/products",

type:"protected",

layout:"dashboard",

roles:[

"SUPER_ADMIN"

],

permission:
"PRODUCT_VIEW",

element:ProductsPage

},



/*
|--------------------------------------------------------------------------
| Category Management
|--------------------------------------------------------------------------
*/


{
path:"/dashboard/categories",

type:"protected",

layout:"dashboard",

roles:[

"SUPER_ADMIN"

],

permission:
"CATEGORY_VIEW",

element:CategoriesPage

},



/*
|--------------------------------------------------------------------------
| Unauthorized
|--------------------------------------------------------------------------
*/


{
path:"/unauthorized",

type:"public",

element:UnauthorizedPage

},



/*
|--------------------------------------------------------------------------
| 404
|--------------------------------------------------------------------------
*/


{
path:"*",

type:"public",

element:NotFoundPage

}


];


export default routeConfig;