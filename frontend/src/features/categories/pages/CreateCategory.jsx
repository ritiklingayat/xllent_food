import CategoryForm
from "../components/CategoryForm";


import {
categoryService
}
from "../services/categoryService";


import {
useNavigate
}
from "react-router-dom";



export default function CreateCategory(){


const navigate=useNavigate();



async function submit(data){


await categoryService.createCategory(
data
);


navigate(
"/admin/categories"
);


}



return (

<CategoryForm

onSubmit={submit}

/>

)

}