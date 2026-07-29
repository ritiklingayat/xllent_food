import {
store
}
from "@/store";


import {
addNotification
}
from "@/features/notifications/notificationSlice";


import toast
from "react-hot-toast";




class WebSocketClient{


constructor(){

this.socket=null;

}





connect(){



/*
 Production:

wss://api.xllentfoods.com/ws

*/


this.socket =
new WebSocket(

"ws://localhost:5000"

);



this.socket.onopen=()=>{


console.log(
"ERP WebSocket Connected"
);


};






this.socket.onmessage=(event)=>{


const data =
JSON.parse(
event.data
);



this.handleEvent(data);



};






this.socket.onerror=(error)=>{


console.log(
"WebSocket Error",
error
);


};






this.socket.onclose=()=>{


console.log(
"WebSocket Disconnected"
);


setTimeout(()=>{

this.connect();

},5000);



};


}







handleEvent(data){



store.dispatch(

addNotification(data)

);



toast.success(

data.message

);



}








disconnect(){


if(this.socket){

this.socket.close();

}


}


}




export default new WebSocketClient();