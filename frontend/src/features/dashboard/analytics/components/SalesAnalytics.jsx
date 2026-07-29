import React from "react";

import {
    TrendingUp
}
from "lucide-react";



export default function SalesAnalytics({
    data = []
}) {



    const totalSales = data.reduce(

        (sum,item)=>
            sum + (item.sales || item.value || 0),

        0

    );



    return (


        <div

            className="
                bg-white
                rounded-3xl
                border
                border-slate-200
                p-6
                shadow-sm
                hover:shadow-xl
                transition
            "

        >



            <div

                className="
                    flex
                    items-center
                    justify-between
                    mb-5
                "

            >


                <div>


                    <h3

                        className="
                            text-lg
                            font-black
                            text-slate-800
                        "

                    >

                        Sales Analytics

                    </h3>


                    <p

                        className="
                            text-sm
                            text-slate-500
                        "

                    >

                        Sales performance overview

                    </p>


                </div>



                <div

                    className="
                        p-3
                        rounded-2xl
                        bg-orange-50
                        text-orange-500
                    "

                >

                    <TrendingUp size={22}/>

                </div>


            </div>





            <div

                className="
                    text-3xl
                    font-black
                    text-slate-900
                "

            >

                ₹ {totalSales.toLocaleString()}


            </div>




            <div

                className="
                    mt-5
                    space-y-3
                "

            >


            {

                data.length > 0

                ?

                data.slice(0,5).map(

                    (item,index)=>(

                        <div

                            key={index}

                            className="
                                flex
                                justify-between
                                text-sm
                                border-b
                                pb-2
                            "

                        >


                            <span>

                                {item.name || `Day ${index+1}`}

                            </span>



                            <span

                                className="
                                    font-bold
                                "

                            >

                                ₹
                                {
                                    (
                                    item.sales ||
                                    item.value ||
                                    0
                                    )
                                    .toLocaleString()
                                }


                            </span>


                        </div>

                    )

                )


                :


                <p

                    className="
                        text-sm
                        text-slate-400
                    "

                >

                    No sales data available

                </p>


            }


            </div>



        </div>


    );

}