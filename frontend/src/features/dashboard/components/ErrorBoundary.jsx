import React from "react";


export default class ErrorBoundary extends React.Component{


state={
error:null
};


static getDerivedStateFromError(error){

return {
error
};

}



render(){


if(this.state.error){

return (

<div className="
p-10
text-red-600
">

<h2 className="text-2xl font-bold">

Dashboard Error

</h2>


<p>

{this.state.error.message}

</p>


</div>

)

}


return this.props.children;


}


}