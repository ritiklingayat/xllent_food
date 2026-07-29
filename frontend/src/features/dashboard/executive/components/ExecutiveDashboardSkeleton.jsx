import { motion } from "framer-motion";


export default function ExecutiveDashboardSkeleton() {

  const cards = Array.from({ length: 6 });


  return (
    <div
      className="
        space-y-8
        animate-pulse
      "
    >

      {/* Header Skeleton */}

      <div
        className="
          h-28
          rounded-3xl
          bg-gray-200
        "
      />


      {/* KPI Cards Skeleton */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-3
          gap-6
        "
      >

        {
          cards.map((_, index)=>(
            <motion.div

              key={index}

              initial={{
                opacity:0
              }}

              animate={{
                opacity:1
              }}

              transition={{
                delay:index*0.05
              }}

              className="
                h-44
                rounded-3xl
                bg-gray-200
              "

            />
          ))
        }

      </div>



      {/* Charts Skeleton */}

      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-2
          gap-6
        "
      >

        <div
          className="
            h-96
            rounded-3xl
            bg-gray-200
          "
        />


        <div
          className="
            h-96
            rounded-3xl
            bg-gray-200
          "
        />

      </div>



      {/* AI Summary Skeleton */}

      <div
        className="
          h-40
          rounded-3xl
          bg-gray-200
        "
      />


    </div>
  );
}