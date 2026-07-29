import { motion } from "framer-motion";

import AIInsightsCard from "./AIInsightsCard";
import ForecastCard from "./ForecastCard";
import BusinessHealthCard from "./BusinessHealthCard";
import SmartRecommendations from "./SmartRecommendations";
import AnomalyDetection from "./AnomalyDetection";

import {
  Sparkles,
  BrainCircuit,
  ShieldCheck,
} from "lucide-react";

export default function AIAnalyticsDashboard() {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.45,
      }}
      className="space-y-8"
    >
      {/* ====================================================== */}
      {/* Hero */}
      {/* ====================================================== */}

      <div
        className="
        relative
        overflow-hidden
        rounded-3xl
        bg-gradient-to-br
        from-slate-900
        via-indigo-900
        to-blue-900
        p-8
        text-white
        shadow-2xl
      "
      >
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl" />

        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-xl">
              <Sparkles size={18} />

              <span className="text-sm font-semibold">
                AI Executive Analytics
              </span>
            </div>

            <h1 className="text-4xl font-black tracking-tight lg:text-5xl">
              Xllent AI Business Intelligence
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Real-time ERP analytics powered by Artificial
              Intelligence with forecasting, anomaly
              detection, business health monitoring,
              predictive insights and smart
              recommendations.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl bg-white/10 p-5 backdrop-blur-xl">
              <BrainCircuit
                className="mb-3 text-cyan-300"
                size={34}
              />

              <h3 className="text-2xl font-black">
                98.7%
              </h3>

              <p className="text-sm text-slate-300">
                AI Accuracy
              </p>
            </div>

            <div className="rounded-3xl bg-white/10 p-5 backdrop-blur-xl">
              <ShieldCheck
                className="mb-3 text-green-300"
                size={34}
              />

              <h3 className="text-2xl font-black">
                24/7
              </h3>

              <p className="text-sm text-slate-300">
                Monitoring
              </p>
            </div>

            <div className="rounded-3xl bg-white/10 p-5 backdrop-blur-xl">
              <Sparkles
                className="mb-3 text-orange-300"
                size={34}
              />

              <h3 className="text-2xl font-black">
                Live
              </h3>

              <p className="text-sm text-slate-300">
                Predictions
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================== */}
      {/* Row 1 */}
      {/* ====================================================== */}

      <div className="grid gap-6 xl:grid-cols-2">
        <motion.div
          layout
          whileHover={{
            y: -3,
          }}
        >
          <AIInsightsCard />
        </motion.div>

        <motion.div
          layout
          whileHover={{
            y: -3,
          }}
        >
          <BusinessHealthCard />
        </motion.div>
      </div>

      {/* ====================================================== */}
      {/* Row 2 */}
      {/* ====================================================== */}

      <div className="grid gap-6 xl:grid-cols-2">
        <motion.div
          layout
          whileHover={{
            y: -3,
          }}
        >
          <ForecastCard />
        </motion.div>

        <motion.div
          layout
          whileHover={{
            y: -3,
          }}
        >
          <AnomalyDetection />
        </motion.div>
      </div>

      {/* ====================================================== */}
      {/* Recommendations */}
      {/* ====================================================== */}

      <motion.div
        layout
        whileHover={{
          y: -3,
        }}
      >
        <SmartRecommendations />
      </motion.div>

      {/* ====================================================== */}
      {/* Footer */}
      {/* ====================================================== */}

      <div
        className="
        rounded-3xl
        border
        border-indigo-100
        bg-gradient-to-r
        from-indigo-50
        via-white
        to-cyan-50
        p-6
        shadow-lg
      "
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              AI Executive Summary
            </h2>

            <p className="mt-2 max-w-3xl text-slate-600">
              The AI engine continuously analyzes ERP
              operations including revenue, inventory,
              customer activity, forecasting, order
              performance, and operational anomalies to
              provide executives with actionable insights
              for faster business decisions.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="rounded-2xl bg-white px-6 py-4 shadow">
              <p className="text-xs text-slate-500">
                AI Version
              </p>

              <h3 className="mt-1 text-xl font-black text-indigo-700">
                v2.5
              </h3>
            </div>

            <div className="rounded-2xl bg-white px-6 py-4 shadow">
              <p className="text-xs text-slate-500">
                Models Running
              </p>

              <h3 className="mt-1 text-xl font-black text-green-700">
                5 Active
              </h3>
            </div>

            <div className="rounded-2xl bg-white px-6 py-4 shadow">
              <p className="text-xs text-slate-500">
                Refresh
              </p>

              <h3 className="mt-1 text-xl font-black text-orange-600">
                Live
              </h3>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}