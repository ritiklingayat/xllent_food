import {
    useSelector
} from "react-redux";


export default function useAnalytics(){


    const dashboard =
        useSelector(
            state => state.dashboard || {}
        );



    const {

        stats = {},

        salesTrend = [],

        orderStatus = [],

        topProducts = [],

        recentOrders = []

    } = dashboard;





    return {


        revenue:
            stats.revenue || 0,


        orders:
            stats.orders || 0,


        products:
            stats.products || 0,


        customers:
            stats.customers || 0,


        salesTrend,


        orderStatus,


        topProducts,


        recentOrders


    };


}