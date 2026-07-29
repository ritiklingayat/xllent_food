import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";



export default function RevenueAnalytics({
    data = {}
}) {


    const chartData =
        data.daily || [];



    return (

        <div

            className="
            rounded-3xl
            bg-white
            border
            border-slate-200
            shadow-sm
            p-6
            "

        >


            <div
                className="
                flex
                justify-between
                items-center
                mb-6
                "
            >

                <h2
                    className="
                    text-xl
                    font-black
                    text-slate-800
                    "
                >

                    Revenue Analytics

                </h2>



                <span
                    className="
                    px-3
                    py-1
                    rounded-full
                    bg-green-100
                    text-green-700
                    text-sm
                    font-bold
                    "
                >

                    +18%

                </span>


            </div>




            <div
                className="
                h-72
                "
            >


                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <BarChart
                        data={chartData}
                    >


                        <XAxis
                            dataKey="date"
                        />


                        <YAxis/>


                        <Tooltip/>

                        
                        <Bar

                            dataKey="value"

                        />


                    </BarChart>


                </ResponsiveContainer>


            </div>



        </div>

    );

}