export const safeDate = (value)=>{

if(!value)
return "-";


try{

return new Date(value)
.toLocaleString(
"en-IN"
);

}
catch{

return "-";

}

};