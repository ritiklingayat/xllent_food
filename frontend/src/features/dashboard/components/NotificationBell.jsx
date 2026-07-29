import React from "react";

import {
    Bell
}
from "lucide-react";


import {
    useSelector
}
from "react-redux";





export default function NotificationBell({ onClick }) {



    const unreadCount =

        useSelector(

            state =>
                state.notifications?.unreadCount ?? 0

        );







    return (


        <button


            type="button"


            onClick={onClick}



            aria-label="Notifications"



            className="
                relative
                flex
                items-center
                justify-center
                p-3
                rounded-xl
                text-slate-600
                hover:text-orange-500
                hover:bg-orange-50
                transition-all
                duration-200
            "



        >



            <Bell

                size={22}

                strokeWidth={2}

            />







            {
                unreadCount > 0 && (



                    <span


                        className="
                            absolute
                            -top-1
                            -right-1
                            min-w-[20px]
                            h-5
                            px-1
                            bg-red-500
                            text-white
                            text-[11px]
                            font-black
                            rounded-full
                            flex
                            items-center
                            justify-center
                            shadow-md
                            ring-2
                            ring-white
                        "



                    >



                        {
                            unreadCount > 99

                                ?

                                "99+"

                                :

                                unreadCount

                        }



                    </span>


                )
            }



        </button>


    );


}