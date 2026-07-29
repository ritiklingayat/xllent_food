import {
  useEffect,
  useState
} from "react";


import {
  motion,
  useMotionValue,
  useSpring,
  useTransform
} from "framer-motion";




// --------------------------------------------------
// Animated Counter
// --------------------------------------------------

const AnimatedCounter = ({
  value = 0,
  duration = 1.5,
  className = ""
}) => {


  const numericValue =
    Number(
      String(value)
        .replace(/[^\d.]/g,"")
    ) || 0;



  const motionValue =
    useMotionValue(0);



  const springValue =
    useSpring(
      motionValue,
      {
        duration:
          duration * 1000
      }
    );



  const displayValue =
    useTransform(
      springValue,
      (latest)=>{


        if(
          String(value)
          .includes("%")
        ){

          return `${Math.floor(latest)}%`;

        }



        if(
          String(value)
          .includes("₹")
        ){

          return `₹${Math.floor(
            latest
          ).toLocaleString("en-IN")}`;

        }



        return Math.floor(
          latest
        ).toLocaleString("en-IN");


      }
    );



  const [
    renderedValue,
    setRenderedValue
  ] = useState(value);



  useEffect(()=>{


    motionValue.set(
      numericValue
    );


    const unsubscribe =
      displayValue.on(
        "change",
        (latest)=>{

          setRenderedValue(
            latest
          );

        }
      );



    return ()=>unsubscribe();



  },[
    value
  ]);




  return (


    <motion.span

      className={
        className
      }

    >

      {renderedValue}


    </motion.span>


  );


};



export default AnimatedCounter;