import {
  motion,
  AnimatePresence
} from "framer-motion";


import {
  X,
  LayoutDashboard,
  RotateCcw,
  Eye,
  EyeOff,
  Check
} from "lucide-react";


import {
  useDispatch,
  useSelector
} from "react-redux";


import {
  toggleWidget,
  updateLayout
} from "../redux/executiveLayoutSlice";


import executiveWidgets
from "../data/executiveWidgets";




// --------------------------------------------------
// Default Layout
// --------------------------------------------------

const DEFAULT_LAYOUT = [

  {
    id:"revenue",
    visible:true
  },

  {
    id:"ai",
    visible:true
  },

  {
    id:"funnel",
    visible:true
  },

  {
    id:"regional",
    visible:true
  },

  {
    id:"customers",
    visible:true
  },

  {
    id:"products",
    visible:true
  },

  {
    id:"cashflow",
    visible:true
  },

  {
    id:"profit",
    visible:true
  },

  {
    id:"activity",
    visible:true
  }

];





// --------------------------------------------------
// Component
// --------------------------------------------------

const WidgetSettingsPanel = ({
  open,
  onClose
}) => {



  const dispatch =
    useDispatch();




  const layout =
    useSelector(
      (state)=>
        state.executiveLayout?.widgets || []
    );






  const handleReset = ()=>{


    dispatch(
      updateLayout(
        DEFAULT_LAYOUT
      )
    );


  };







  return (



    <AnimatePresence>



      {
        open &&

        (

        <>


          {/* Overlay */}


          <motion.div


            initial={{
              opacity:0
            }}


            animate={{
              opacity:1
            }}


            exit={{
              opacity:0
            }}


            onClick={onClose}


            className="

            fixed

            inset-0

            bg-black/40

            backdrop-blur-sm

            z-40

            "

          />








          {/* Drawer */}



          <motion.aside



            initial={{
              x:"100%"
            }}


            animate={{
              x:0
            }}


            exit={{
              x:"100%"
            }}



            transition={{
              type:"spring",
              damping:25
            }}



            className="

            fixed

            right-0

            top-0

            h-screen

            w-full

            sm:w-[420px]

            z-50

            bg-white/90

            dark:bg-slate-950/90

            backdrop-blur-xl

            border-l

            border-white/20

            shadow-2xl

            p-6

            overflow-y-auto

            "

          >








            {/* Header */}



            <div


              className="

              flex

              items-center

              justify-between

              mb-6

              "

            >



              <div


                className="

                flex

                items-center

                gap-3

                "

              >



                <div


                  className="

                  h-11

                  w-11

                  rounded-2xl

                  bg-gradient-to-br

                  from-blue-600

                  to-purple-600

                  text-white

                  flex

                  items-center

                  justify-center

                  "

                >

                  <LayoutDashboard

                    size={22}

                  />

                </div>




                <div>


                  <h2


                    className="

                    text-xl

                    font-bold

                    dark:text-white

                    "

                  >

                    Dashboard Widgets

                  </h2>


                  <p

                    className="

                    text-xs

                    text-slate-500

                    "

                  >

                    Customize executive view

                  </p>


                </div>



              </div>






              <button


                onClick={onClose}


                className="

                p-2

                rounded-xl

                hover:bg-slate-100

                dark:hover:bg-slate-800

                "

              >


                <X size={20}/>


              </button>



            </div>









            {/* Widget List */}



            <div


              className="

              space-y-3

              "

            >




              {
                executiveWidgets.map(
                  widget=>{


                    const stateWidget =
                      layout.find(
                        item =>
                          item.id === widget.id
                      );



                    const enabled =
                      stateWidget?.visible;





                    return (


                      <motion.div



                        key={
                          widget.id
                        }



                        whileHover={{
                          scale:1.02
                        }}



                        className="

                        flex

                        items-center

                        justify-between

                        p-4

                        rounded-2xl

                        bg-slate-100/70

                        dark:bg-slate-900

                        border

                        border-white/20

                        "

                      >





                        <div


                          className="

                          flex

                          items-center

                          gap-3

                          "

                        >



                          {
                            enabled

                            ?

                            <Eye

                              size={18}

                              className="text-green-500"

                            />

                            :

                            <EyeOff

                              size={18}

                              className="text-slate-400"

                            />

                          }




                          <div>


                            <p


                              className="

                              font-semibold

                              text-sm

                              dark:text-white

                              "

                            >

                              {
                                widget.title
                              }

                            </p>


                            <p


                              className="

                              text-xs

                              text-slate-500

                              "

                            >

                              Executive widget

                            </p>


                          </div>



                        </div>







                        <button


                          onClick={()=>


                            dispatch(

                              toggleWidget(
                                widget.id
                              )

                            )


                          }



                          className={`

                          h-9

                          w-9

                          rounded-xl

                          flex

                          items-center

                          justify-center


                          ${

                          enabled

                          ?

                          "bg-green-500 text-white"

                          :

                          "bg-slate-200 dark:bg-slate-700"

                          }

                          `}


                        >


                          {
                            enabled &&

                            <Check

                              size={18}

                            />
                          }


                        </button>





                      </motion.div>


                    );


                  }
                )
              }




            </div>









            {/* Reset Button */}



            <button



              onClick={handleReset}



              className="

              mt-8

              w-full

              flex

              items-center

              justify-center

              gap-2

              rounded-2xl

              py-3

              bg-gradient-to-r

              from-red-500

              to-orange-500

              text-white

              font-semibold

              shadow-lg

              hover:scale-[1.02]

              transition

              "

            >


              <RotateCcw size={18}/>


              Reset Dashboard


            </button>





          </motion.aside>



        </>


        )

      }



    </AnimatePresence>



  );

};



export default WidgetSettingsPanel;