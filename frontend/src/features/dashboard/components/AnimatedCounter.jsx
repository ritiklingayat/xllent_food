import {
useEffect,
useState
}
from "react";



export default function AnimatedCounter({

value=0,

duration=1200,

prefix=""

}){


const [count,setCount]=useState(0);



useEffect(()=>{


let start=0;


const increment=
value/(duration/30);



const timer=setInterval(()=>{


start += increment;



if(start>=value){


setCount(value);

clearInterval(timer);


}

else{


setCount(
Math.floor(start)
);


}



},30);



return ()=>clearInterval(timer);



},[
value,
duration
]);





return (

<span>

{prefix}

{count.toLocaleString("en-IN")}

</span>

);


}