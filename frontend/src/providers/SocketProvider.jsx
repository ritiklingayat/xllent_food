import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";


const SocketContext = createContext(null);



const SocketProvider = ({
  children
}) => {


  const [connected, setConnected] = useState(false);

  const [events, setEvents] = useState([]);



  useEffect(() => {


    // Mock realtime connection
    // Replace later with Socket.IO client


    setConnected(true);



    const interval = setInterval(() => {


      const mockEvents = [

        {
          type: "ORDER",
          message: "New order received",
          value: "₹8,500"
        },


        {
          type: "INVENTORY",
          message: "Low stock detected",
          value: "Premium Paneer"
        },


        {
          type: "CUSTOMER",
          message: "New customer registered",
          value: "New User"
        },


        {
          type: "AI",
          message: "AI prediction updated",
          value: "+18% Growth"
        }

      ];



      const randomEvent =
        mockEvents[
          Math.floor(
            Math.random() * mockEvents.length
          )
        ];



      setEvents((previous)=>[

        {
          id:Date.now(),

          ...randomEvent,

          time:new Date()

        },


        ...previous.slice(0,20)

      ]);



    },5000);





    return ()=>{

      clearInterval(interval);

    };


  },[]);





  return (


    <SocketContext.Provider

      value={{

        connected,

        events

      }}

    >

      {children}


    </SocketContext.Provider>


  );


};





export const useSocket = () => {


  return useContext(SocketContext);


};





export default SocketProvider;