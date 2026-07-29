import {
  useMemo
} from "react";


import {
  DndContext,
  closestCenter
} from "@dnd-kit/core";


import {
  arrayMove,
  SortableContext,
  rectSortingStrategy
} from "@dnd-kit/sortable";


import {
  useDispatch,
  useSelector
} from "react-redux";


import {
  updateLayout
} from "../redux/executiveLayoutSlice";


import WidgetWrapper
from "./WidgetWrapper";


import executiveWidgets
from "../data/executiveWidgets";



// --------------------------------------------------
// Sortable Item
// --------------------------------------------------

const SortableWidget = ({
  widget
}) => {


  const Component =
    widget.component;



  return (


    <WidgetWrapper

      id={widget.id}

      title={widget.title}

    >


      <Component />


    </WidgetWrapper>


  );


};




// --------------------------------------------------
// Component
// --------------------------------------------------

const ExecutiveWidgetGrid = () => {


  const dispatch =
    useDispatch();



  const layout =
    useSelector(
      (state)=>
        state.executiveLayout?.widgets || []
    );




  // --------------------------------------------------
  // Merge Layout + Components
  // --------------------------------------------------

  const widgets =
    useMemo(()=>{


      return layout

      .map(item=>{


        const config =
          executiveWidgets.find(
            widget =>
              widget.id === item.id
          );


        if(!config)
          return null;



        return {

          ...config,

          visible:item.visible

        };


      })

      .filter(
        item =>
          item &&
          item.visible
      );


    },[layout]);





  // --------------------------------------------------
  // Drag End
  // --------------------------------------------------

  const handleDragEnd =
  (event)=>{


    const {
      active,
      over
    } = event;



    if(
      !over ||
      active.id === over.id
    )
    return;




    const oldIndex =
      layout.findIndex(
        item =>
          item.id === active.id
      );



    const newIndex =
      layout.findIndex(
        item =>
          item.id === over.id
      );




    const newLayout =
      arrayMove(
        layout,
        oldIndex,
        newIndex
      );



    dispatch(
      updateLayout(
        newLayout
      )
    );


  };





  return (


    <DndContext

      collisionDetection={
        closestCenter
      }

      onDragEnd={
        handleDragEnd
      }

    >



      <SortableContext


        items={
          widgets.map(
            item =>
              item.id
          )
        }


        strategy={
          rectSortingStrategy
        }


      >




        <section


          className="

          grid

          grid-cols-1

          md:grid-cols-2

          xl:grid-cols-3

          gap-6

          "


        >



          {
            widgets.map(
              widget => (


                <SortableWidget


                  key={
                    widget.id
                  }


                  widget={
                    widget
                  }


                />


              )
            )
          }



        </section>



      </SortableContext>



    </DndContext>


  );


};



export default ExecutiveWidgetGrid;