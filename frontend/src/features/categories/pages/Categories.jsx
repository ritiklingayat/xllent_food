import {useState} from "react";
import {
getCategories,
addCategory,
deleteCategory
}
from "../services/categoryStorage";


import CategoryTable from "../components/CategoryTable";


export default function Categories(){


const [categories,setCategories]=useState(
getCategories()
);



const add=()=>{


addCategory({

name:"Cooking Oil"

});


setCategories(
getCategories()
);


};



return (

<div>


<div className="
flex justify-between mb-5
">


<h1 className="
text-3xl font-bold
">

Categories

</h1>



<button
onClick={add}
className="
bg-green-600
text-white
px-4 py-2 rounded
">

Add Category

</button>


</div>


<CategoryTable

data={categories}

deleteCategory={(id)=>{

deleteCategory(id);

setCategories(
getCategories()
)

}}

/>


</div>

)

}