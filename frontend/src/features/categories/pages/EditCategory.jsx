import {
useEffect,
useState
}
from "react";


import CategoryForm
from "../components/CategoryForm";


import {
categoryService
}
from "../services/categoryService";


import {
useParams,
useNavigate
}
from "react-router-dom";



export default function EditCategory(){


const {id}=useParams();

const navigate=useNavigate();


const [category,setCategory]=useState(null);



useEffect(()=>{

load();

},[]);



async function load(){

const data =
await categoryService.fetchCategory(id);

setCategory(data);

}



async function submit(data){


await categoryService.updateCategory(
id,
data
);


navigate(
"/admin/categories"
);


}



if(!category)

return <p>
Loading...
</p>



return (

<CategoryForm

initialData={category}

onSubmit={submit}

/>

)


}