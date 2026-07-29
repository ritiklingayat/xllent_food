const KEY="categories";


export const getCategories=()=>{

return JSON.parse(
localStorage.getItem(KEY)
)||[];

};



export const saveCategories=(data)=>{

localStorage.setItem(
KEY,
JSON.stringify(data)
)

};



export const addCategory=(category)=>{

const data=getCategories();


saveCategories([
...data,
{
...category,
id:Date.now()
}
]);


};



export const deleteCategory=(id)=>{


saveCategories(
getCategories()
.filter(
item=>item.id!==id
)
);


};