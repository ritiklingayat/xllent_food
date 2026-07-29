import {
  useState
} from "react";


import {
  motion
} from "framer-motion";


import {
  Settings,
  Search,
  RefreshCcw,
  Moon,
  Sun,
  LayoutDashboard
} from "lucide-react";




// --------------------------------------------------
// Component
// --------------------------------------------------

const MobileDashboardToolbar = ({
  onSettingsOpen
}) => {


  const [darkMode,setDarkMode] =
    useState(
      document.documentElement.classList.contains(
        "dark"
      )
    );


  const [refreshing,setRefreshing] =
    useState(false);





  // --------------------------------------------------
  // Theme Toggle
  // --------------------------------------------------

  const toggleTheme = ()=>{


    const next =
      !darkMode;



    setDarkMode(
      next
    );



    if(next){


      document.documentElement.classList.add(
        "dark"
      );


      localStorage.setItem(
        "theme",
        "dark"
      );


    }

    else{


      document.documentElement.classList.remove(
        "dark"
      );


      localStorage.setItem(
        "theme",
        "light"
      );


    }


  };







  // --------------------------------------------------
  // Refresh
  // --------------------------------------------------

  const handleRefresh = ()=>{


    setRefreshing(
      true
    );


    setTimeout(()=>{


      setRefreshing(
        false
      );


    },1200);


  };







  return (


    <motion.div


      initial={{
        y:100,
        opacity:0
      }}


      animate={{
        y:0,
        opacity:1
      }}


      transition={{
        duration:0.4
      }}



      className="

      fixed

      bottom-4

      left-4

      right-4

      z-50

      md:hidden

      "


    >



      <div


        className="

        rounded-3xl

        border

        border-white/20

        bg-white/80

        dark:bg-slate-900/80

        backdrop-blur-xl

        shadow-2xl

        px-4

        py-3

        flex

        items-center

        justify-between

        "

      >







        {/* Dashboard */}


        <button


          className="

          flex

          flex-col

          items-center

          gap-1

          text-slate-600

          dark:text-slate-300

          "

        >


          <LayoutDashboard

            size={21}

          />


          <span

            className="

            text-[10px]

            "

          >

            Home

          </span>


        </button>









        {/* Search */}


        <button


          onClick={()=>{


            const search =
              document.querySelector(
                "input[placeholder='Search dashboard...']"
              );


            if(search)
              search.focus();


          }}



          className="

          flex

          flex-col

          items-center

          gap-1

          text-slate-600

          dark:text-slate-300

          "

        >


          <Search

            size={21}

          />


          <span

            className="

            text-[10px]

            "

          >

            Search

          </span>


        </button>









        {/* Customize */}


        <button


          onClick={
            onSettingsOpen
          }



          className="

          -mt-8

          h-14

          w-14

          rounded-full

          bg-gradient-to-br

          from-blue-600

          to-purple-600

          text-white

          shadow-xl

          flex

          items-center

          justify-center

          "

        >


          <Settings

            size={25}

          />


        </button>









        {/* Refresh */}


        <button


          onClick={
            handleRefresh
          }



          className="

          flex

          flex-col

          items-center

          gap-1

          text-slate-600

          dark:text-slate-300

          "

        >


          <RefreshCcw


            size={21}


            className={

              refreshing

              ?

              "animate-spin"

              :

              ""

            }

          />


          <span

            className="

            text-[10px]

            "

          >

            Refresh

          </span>


        </button>









        {/* Theme */}


        <button


          onClick={
            toggleTheme
          }



          className="

          flex

          flex-col

          items-center

          gap-1

          text-slate-600

          dark:text-slate-300

          "

        >



          {
            darkMode

            ?

            <Sun size={21}/>

            :

            <Moon size={21}/>

          }



          <span

            className="

            text-[10px]

            "

          >

            Theme

          </span>



        </button>





      </div>


    </motion.div>


  );


};



export default MobileDashboardToolbar;