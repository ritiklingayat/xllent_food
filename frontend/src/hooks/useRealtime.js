import {
useEffect
}
from "react";


import websocketClient
from "@/services/websocket/websocketClient";



export default function useRealtime(){


useEffect(()=>{


websocketClient.connect();



return ()=>{


websocketClient.disconnect();


};


},[]);


}