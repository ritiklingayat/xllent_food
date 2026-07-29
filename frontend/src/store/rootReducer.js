import {
  combineReducers
} from "@reduxjs/toolkit";



// Authentication

import authReducer
from "@/features/auth/store/authSlice";



// Dashboard

import dashboardReducer
from "@/features/dashboard/dashboardSlice";


// Dashboard Layout

import dashboardLayoutReducer
from "@/features/dashboard/customization/dashboardLayoutSlice";


// Notifications

import notificationReducer
from "@/features/dashboard/notifications/notificationSlice";


// AI

import aiReducer
from "@/features/dashboard/ai/aiSlice";


// AI Chat

import aiChatReducer
from "@/features/dashboard/aiAssistant/redux/aiChatSlice";


// Executive Dashboard

import executiveLayoutReducer
from "@/features/dashboard/executive/redux/executiveLayoutSlice";


import executiveReducer
from "@/features/dashboard/executive/executiveSlice";






const rootReducer = combineReducers({



/*
|--------------------------------------------------------------------------
| Authentication
|--------------------------------------------------------------------------
*/


auth:
authReducer,





/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
*/


dashboard:
dashboardReducer,


dashboardLayout:
dashboardLayoutReducer,





/*
|--------------------------------------------------------------------------
| Notifications
|--------------------------------------------------------------------------
*/


notifications:
notificationReducer,





/*
|--------------------------------------------------------------------------
| AI Modules
|--------------------------------------------------------------------------
*/


ai:
aiReducer,


aiChat:
aiChatReducer,







/*
|--------------------------------------------------------------------------
| Executive Dashboard
|--------------------------------------------------------------------------
*/


executiveLayout:
executiveLayoutReducer,


executive:
executiveReducer,




});






export default rootReducer;