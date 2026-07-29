import React from "react";


import {
  Routes,
  Route,
} from "react-router-dom";


import PublicLayout
from "@/layouts/PublicLayout";



const Home = () => {


return (

<div>

<h1 className="text-4xl font-bold">

Xllent Foods

</h1>


<p>

Premium Food Products

</p>


</div>

);

};





const Products = () => {


return (

<div>

<h1 className="text-2xl font-bold">

Products

</h1>


</div>

);

};





const Categories = () => {


return (

<div>

<h1 className="text-2xl font-bold">

Categories

</h1>


</div>

);

};






const PublicRoutes = () => {


return (

<Routes>


<Route

element={
<PublicLayout />
}

>


<Route

path="/"

element={
<Home />
}

/>


<Route

path="/products"

element={
<Products />
}

/>


<Route

path="/categories"

element={
<Categories />
}

/>


</Route>


</Routes>

);


};


export default PublicRoutes;