import {
useEffect,
useState
}
from "react";


import CategoryTable
from "../components/CategoryTable";


import {
categoryService
}
from "../services/categoryService";


import {
useNavigate
}
from "react-router-dom";



export default function CategoryList(){


const [categories,setCategories]=useState([]);

const navigate=useNavigate();



useEffect(()=>{

loadCategories();

},[]);



async function loadCategories(){

const data =
await categoryService.fetchCategories();

setCategories(data);

}



async function deleteCategory(id){

await categoryService.deleteCategory(id);

loadCategories();

}



return (

<div>



<div className="
flex justify-between mb-6
">


<h1 className="
text-2xl font-bold
">

Categories

</h1>



<button

onClick={()=>
navigate(
"/admin/categories/create"
)
}

className="
bg-blue-600
text-white
px-4
py-2
rounded
"

>

Add Category

</button>



</div>



<CategoryTable

categories={categories}

onEdit={
id=>
navigate(
`/admin/categories/${id}/edit`
)
}


onDelete={deleteCategory}

/>



</div>

)

}