import {
  useState
} from "react";


import {
  motion
} from "framer-motion";


import {
  useSortable
} from "@dnd-kit/sortable";


import {
  CSS
} from "@dnd-kit/utilities";


import {
  GripVertical,
  Maximize2,
  Minimize2,
  Settings,
  X
} from "lucide-react";



// --------------------------------------------------
// Component
// --------------------------------------------------

const WidgetWrapper = ({
  id,
  title,
  children
}) => {


  const {

    attributes,

    listeners,

    setNodeRef,

    transform,

    transition

  } = useSortable({
    id
  });



  const [fullscreen,setFullscreen] =
    useState(false);



  const [settingsOpen,setSettingsOpen] =
    useState(false);



  const style = {

    transform:
      CSS.Transform.toString(
        transform
      ),

    transition

  };





  return (


    <motion.div


      ref={
        setNodeRef
      }


      style={
        style
      }


      {...attributes}



      layout



      initial={{
        opacity:0,
        y:20
      }}



      animate={{
        opacity:1,
        y:0
      }}



      transition={{
        duration:0.35
      }}




      className={`
      
      ${
        fullscreen

        ?

        "fixed inset-4 z-[100]"

        :

        "relative"

      }

      rounded-3xl

      border

      border-white/20

      bg-white/70

      dark:bg-slate-900/70

      backdrop-blur-xl

      shadow-xl

      overflow-hidden

      group

      `}


    >




      {/* Background Glow */}


      <div


        className="

        absolute

        -right-10

        -top-10

        h-40

        w-40

        rounded-full

        bg-gradient-to-br

        from-blue-500/20

        to-purple-500/20

        blur-3xl

        pointer-events-none

        "

      />






      {/* Header */}


      <div


        className="

        relative

        flex

        items-center

        justify-between

        px-5

        py-4

        border-b

        border-white/20

        dark:border-slate-700

        "

      >




        {/* Left */}


        <div


          className="

          flex

          items-center

          gap-3

          "

        >



          {/* Drag Handle */}


          <button


            {...listeners}


            className="

            cursor-grab

            active:cursor-grabbing

            text-slate-400

            hover:text-blue-500

            transition

            "


            title="Drag widget"

          >


            <GripVertical

              size={20}

            />


          </button>





          <h3


            className="

            font-bold

            text-slate-900

            dark:text-white

            "

          >


            {title}


          </h3>



        </div>







        {/* Actions */}


        <div


          className="

          flex

          items-center

          gap-2

          opacity-80

          group-hover:opacity-100

          transition

          "

        >




          {/* Settings */}


          <button


            onClick={()=>
              setSettingsOpen(
                !settingsOpen
              )
            }


            className="

            p-2

            rounded-xl

            hover:bg-slate-100

            dark:hover:bg-slate-800

            "

          >

            <Settings

              size={17}

            />


          </button>






          {/* Full Screen */}


          <button


            onClick={()=>
              setFullscreen(
                !fullscreen
              )
            }


            className="

            p-2

            rounded-xl

            hover:bg-slate-100

            dark:hover:bg-slate-800

            "

          >


            {
              fullscreen

              ?

              <Minimize2

                size={17}

              />

              :

              <Maximize2

                size={17}

              />

            }


          </button>






          {/* Close Fullscreen */}


          {
            fullscreen &&

            (

            <button


              onClick={()=>
                setFullscreen(
                  false
                )
              }


              className="

              p-2

              rounded-xl

              hover:bg-red-100

              text-red-500

              "

            >


              <X

                size={17}

              />


            </button>


            )

          }




        </div>



      </div>








      {/* Settings Panel */}



      {
        settingsOpen &&


        (

        <motion.div


          initial={{
            opacity:0,
            height:0
          }}


          animate={{
            opacity:1,
            height:"auto"
          }}



          className="

          px-5

          py-4

          bg-slate-100/70

          dark:bg-slate-800/70

          text-sm

          "

        >


          <div

            className="

            flex

            items-center

            justify-between

            "

          >


            <span>

              Widget Settings

            </span>



            <button


              onClick={()=>
                setSettingsOpen(false)
              }

            >

              <X

                size={16}

              />


            </button>


          </div>



          <div


            className="

            mt-3

            space-y-2

            text-xs

            text-slate-500

            "

          >


            <p>
              ✓ Animation Enabled
            </p>


            <p>
              ✓ Auto Refresh Ready
            </p>


            <p>
              ✓ Drag & Drop Enabled
            </p>



          </div>



        </motion.div>


        )

      }








      {/* Widget Content */}



      <div


        className="

        relative

        p-5

        "

      >



        {children}



      </div>





    </motion.div>


  );

};



export default WidgetWrapper;