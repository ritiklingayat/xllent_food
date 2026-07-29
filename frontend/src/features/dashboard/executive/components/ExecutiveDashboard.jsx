import {
  useState
} from "react";


import {
  motion
} from "framer-motion";



// Components

import ExecutiveHeader
from "./components/ExecutiveHeader";


import ExecutiveWidgetGrid
from "./components/ExecutiveWidgetGrid";


import WidgetSettingsPanel
from "./components/WidgetSettingsPanel";


import MobileDashboardToolbar
from "./components/MobileDashboardToolbar";



// --------------------------------------------------
// Dashboard
// --------------------------------------------------

const ExecutiveDashboard = () => {


  const [
    settingsOpen,
    setSettingsOpen
  ] = useState(false);





  return (


    <motion.main


      initial={{
        opacity:0,
        y:20
      }}


      animate={{
        opacity:1,
        y:0
      }}



      transition={{
        duration:0.6
      }}



      className="

      min-h-screen


      bg-gradient-to-br

      from-slate-100

      via-blue-50

      to-purple-100



      dark:from-slate-950

      dark:via-slate-900

      dark:to-black



      p-4

      lg:p-8


      pb-28

      "

    >







      {/* Header */}


      <ExecutiveHeader />










      {/* Hero Section */}



      <motion.section



        initial={{
          opacity:0,
          y:20
        }}



        animate={{
          opacity:1,
          y:0
        }}



        transition={{
          delay:0.15
        }}



        className="

        mt-8

        rounded-3xl

        border

        border-white/20


        bg-white/70


        dark:bg-slate-900/70


        backdrop-blur-xl


        shadow-xl


        p-6


        "

      >




        <div


          className="

          flex

          flex-col

          lg:flex-row

          lg:items-center

          lg:justify-between

          gap-5

          "

        >





          <div>



            <h1


              className="

              text-3xl

              font-bold

              text-slate-900

              dark:text-white

              "

            >

              Executive Intelligence Dashboard 🚀

            </h1>




            <p


              className="

              mt-2

              text-slate-500

              dark:text-slate-400

              "

            >

              AI powered business analytics,
              revenue intelligence and
              operational monitoring.

            </p>



          </div>









          {/* Status Badge */}


          <div


            className="

            inline-flex

            items-center

            gap-2


            rounded-2xl


            px-5

            py-3


            bg-gradient-to-r


            from-blue-600


            to-purple-600


            text-white


            shadow-lg


            font-semibold


            "

          >


            <span

              className="

              h-2

              w-2

              rounded-full

              bg-green-300

              animate-pulse

              "

            />


            AI Business Intelligence Active


          </div>





        </div>




      </motion.section>









      {/* Widget Area */}



      <section


        className="

        mt-8

        "

      >



        <ExecutiveWidgetGrid />


      </section>












      {/* Widget Settings Drawer */}



      <WidgetSettingsPanel


        open={
          settingsOpen
        }


        onClose={()=>


          setSettingsOpen(false)


        }


      />









      {/* Mobile Toolbar */}



      <MobileDashboardToolbar



        onSettingsOpen={()=>


          setSettingsOpen(true)


        }


      />







    </motion.main>


  );


};



export default ExecutiveDashboard;