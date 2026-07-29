import React from "react";
import { motion } from "framer-motion";
import {
    RefreshCcw,
    CalendarDays,
    Building2,
    Sparkles,
} from "lucide-react";

import NotificationBell from "./NotificationBell";
import DashboardSettingsButton from "./DashboardSettingsButton";
import DashboardFilters from "./DashboardFilters";
import ExportReport from "./ExportReport";
import SearchBar from "./SearchBar";
import LiveClock from "./LiveClock";

export default function DashboardHeader({ onRefresh }) {
    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 p-8 text-white shadow-2xl"
        >
            {/* Background */}

            <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />

            <div className="absolute -bottom-12 -left-12 h-56 w-56 rounded-full bg-orange-500/20 blur-3xl" />

            <div className="relative space-y-8">
                {/* Top Row */}

                <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
                    {/* Left */}

                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md">
                                <Building2 size={28} />
                            </div>

                            <div>
                                <p className="text-sm text-orange-300">
                                    Xllent Foods ERP
                                </p>

                                <h1 className="text-4xl font-black tracking-tight">
                                    Dashboard
                                </h1>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold">
                                Welcome back 👋
                            </h2>

                            <p className="mt-2 max-w-2xl text-slate-300">
                                Monitor revenue, inventory, sales,
                                orders and business performance in
                                real time.
                            </p>
                        </div>
                    </div>

                    {/* Right */}

                    <div className="flex flex-wrap items-center gap-3">
                        <NotificationBell />

                        <DashboardSettingsButton />

                        <button
                            onClick={onRefresh}
                            className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-slate-900 shadow-lg transition hover:scale-105"
                        >
                            <RefreshCcw size={18} />

                            Refresh
                        </button>
                    </div>
                </div>

                {/* Search */}

                <SearchBar />

                {/* Bottom */}

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                    <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur-md">
                        <CalendarDays size={22} />

                        <div>
                            <p className="text-xs text-slate-300">
                                Analytics Period
                            </p>

                            <p className="font-semibold">
                                Last 30 Days
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur-md">
                        <Sparkles size={22} />

                        <div>
                            <p className="text-xs text-slate-300">
                                Live Status
                            </p>

                            <p className="font-semibold text-emerald-300">
                                System Healthy
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between rounded-2xl bg-white/10 p-4 backdrop-blur-md">
                        <LiveClock />
                    </div>
                </div>

                {/* Bottom Actions */}

                <div className="flex flex-wrap items-center justify-between gap-4">
                    <DashboardFilters />

                    <ExportReport />
                </div>
            </div>
        </motion.header>
    );
}