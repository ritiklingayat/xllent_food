import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  Building2,
  Package,
  ChartNoAxesCombined,
  LogIn,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Store,
  Truck
} from "lucide-react";
import { productService } from "@/features/products/services/productService";

const brand = {
  name: "Xllent Retailers",
  phone: "+91 73878 77820",
  email: "xllentfoods91@gmail.com"
};

const strengths = [
  { icon: Store, title: "Retail-first supply", copy: "Built for shops, wholesalers, distributors, and fast-moving FMCG counters." },
  { icon: Boxes, title: "Category control", copy: "Products, prices, and images are managed from the Super Admin workspace." },
  { icon: Truck, title: "Order visibility", copy: "Orders, invoices, approvals, and revenue stay connected in one simple flow." }
];

const steps = [
  "Super Admin creates user ID and password",
  "Users login with issued credentials",
  "Orders and product prices stay centrally managed"
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await productService.fetchProducts();
        // The backend might wrap it in an object, but Products.jsx expects an array. We will fall back to data.products if it exists.
        const productArray = Array.isArray(data) ? data : data?.products || [];
        // Only products made active by an admin are visible publicly.
        const activeProducts = productArray.filter(
          product => !product.status || String(product.status).toUpperCase() === "ACTIVE"
        );
        setProducts(activeProducts);
      } catch (err) {
        console.error("Failed to load products for landing page", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
    window.addEventListener("focus", fetchProducts);

    return () => window.removeEventListener("focus", fetchProducts);
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-[#070B1A] text-slate-200 font-sans">
      
      {/* HEADER */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#070B1A]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
          <button className="group flex items-center gap-3 text-left" onClick={() => navigate("/")} type="button">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-600 font-bold text-white shadow-[0_0_15px_rgba(234,88,12,0.5)] transition-all group-hover:shadow-[0_0_25px_rgba(234,88,12,0.7)]">
              XR
            </div>
            <div>
              <div className="text-lg font-bold tracking-tight text-white">{brand.name}</div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-orange-500">Retail FMCG supply</div>
            </div>
          </button>
          
          <button 
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/10"
          >
            <LogIn className="h-4 w-4" />
            Login
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative flex min-h-screen items-center pt-20">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            alt="Retail shelves"
            className="h-full w-full object-cover opacity-20 mix-blend-overlay"
            src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=1800&q=85"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#070B1A]/90 via-[#070B1A]/80 to-[#070B1A]" />
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 px-5 py-12 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-xs font-bold text-orange-400 backdrop-blur-md">
              <Sparkles className="h-4 w-4" />
              Super Admin controlled retail network
            </div>
            
            <h1 className="text-5xl font-extrabold tracking-tight text-white md:text-7xl">
              Premium <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">FMCG Supply</span>
            </h1>
            
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
              A clean FMCG ordering platform for wholesalers, distributors,
              super stockists, and retailers, with product pricing and user
              access managed from one Super Admin panel.
            </p>
            
            <div className="mt-10 flex flex-wrap gap-4">
              <button 
                onClick={() => navigate("/catalogue")} 
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-600 to-orange-500 px-8 py-3.5 text-sm font-bold text-white shadow-[0_0_20px_rgba(234,88,12,0.4)] transition hover:scale-105 hover:shadow-[0_0_30px_rgba(234,88,12,0.6)]"
              >
                Explore Products
                <ArrowRight className="h-5 w-5" />
              </button>
              <button 
                onClick={() => navigate("/login")} 
                className="flex items-center gap-2 rounded-full border border-slate-600 bg-slate-800/50 px-8 py-3.5 text-sm font-bold text-white backdrop-blur-md transition hover:border-slate-500 hover:bg-slate-700/50"
              >
                Login With User ID
              </button>
            </div>
          </motion.div>

          {/* Floating Feature Panel */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/20">
                <ChartNoAxesCombined className="h-6 w-6 text-orange-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Business Control</h2>
                <p className="text-sm text-slate-400">Products, users, pricing, orders, and revenue.</p>
              </div>
            </div>

            <div className="mt-6 grid gap-3">
              {steps.map((step, index) => (
                <div className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/5 p-4 transition hover:bg-white/10" key={step}>
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white shadow-[0_0_10px_rgba(234,88,12,0.5)]">
                    {index + 1}
                  </div>
                  <span className="text-sm font-medium text-slate-200">{step}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* RETAIL-FIRST SUPPLY */}
      <section className="relative z-10 mx-auto max-w-7xl px-5 py-24">
        <div className="grid gap-6 md:grid-cols-3">
          {strengths.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-2xl border border-white/10 bg-white/5 p-8 transition duration-300 hover:-translate-y-2 hover:border-orange-500/50 hover:bg-white/10" 
                key={item.title}
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-orange-500/20 text-orange-400 shadow-[0_0_15px_rgba(234,88,12,0.1)] transition group-hover:bg-orange-500 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(234,88,12,0.4)]">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{item.copy}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* DYNAMIC PRODUCT SHOWCASE */}
      <section className="relative z-10 py-24" style={{ backgroundColor: "#fdfbf7" }}>
        <div className="mx-auto max-w-7xl px-5">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">SHOP BY CATEGORY</p>
              <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl" style={{ fontFamily: "serif" }}>Premium Products for Every Need</h2>
              <p className="mt-2 text-sm text-slate-500 max-w-xl">
                Explore our catalog for trials, monthly family cooking, and high-volume kitchens.
              </p>
            </div>
            <button 
              onClick={() => navigate("/catalogue")} 
              className="flex items-center gap-2 rounded-md border border-orange-200 bg-orange-50 px-6 py-2.5 text-sm font-semibold text-orange-700 transition hover:bg-orange-100"
            >
              View Full Catalogue
              <PackageCheck className="h-4 w-4" />
            </button>
          </div>
          
          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map(n => (
                <div key={n} className="h-96 animate-pulse rounded-xl bg-white shadow-sm border border-slate-100" />
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product, idx) => {
                const productImg = product.image || product.imageUrl || product.thumbnail || (product.images && product.images[0]);
                const productPrice = product.shopPrice || product.mrp || product.sellingPrice || product.price || 0;
                const productName = product.productName || product.name || "Unknown Product";
                const productCategory = product.categoryName || product.category || "General";
                
                return (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  key={product.id || product._id || idx}
                  className="flex flex-col overflow-hidden rounded-xl bg-white shadow-sm border border-slate-200 transition-all hover:shadow-md"
                >
                  <div className="relative h-56 w-full bg-slate-100 overflow-hidden">
                    {productImg ? (
                      <img 
                        alt={productName} 
                        className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" 
                        src={productImg} 
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-slate-100">
                        <Package className="h-16 w-16 text-slate-300" />
                      </div>
                    )}
                    <div className="absolute top-4 left-4 rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-800 shadow-sm">
                      {productCategory}
                    </div>
                  </div>
                  
                  <div className="flex flex-col flex-1 p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-slate-900" style={{ fontFamily: "serif" }}>{productName}</h3>
                      <div className="text-right">
                        <div className="text-lg font-bold text-slate-900">₹{productPrice}</div>
                        {product.mrp && product.mrp > productPrice && (
                          <div className="text-xs text-slate-400 line-through">₹{product.mrp}</div>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-sm text-slate-500 line-clamp-2 mb-4 h-10">
                      {product.description || `Premium quality ${productName} crafted for the best experience and traditional recipes.`}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {["Pieces: " + (product.pieces || "1"), "Packets: " + (product.packets || "1"), "Cartons: " + (product.stock_Cartons || "1")].map(tag => (
                        <span key={tag} className="rounded-md border border-slate-200 px-3 py-1 text-xs text-slate-600">
                          {tag}
                        </span>
                      ))}
                    </div>


                    

                    <div className="mt-auto flex gap-3 pt-4 border-t border-slate-100">
                      <button className="flex-1 flex items-center justify-center gap-2 rounded-md bg-[#dca543] py-2.5 text-sm font-bold text-white transition hover:bg-[#c69138]">
                        <PackageCheck className="h-4 w-4" />
                        Add
                      </button>
                      <button 
                        onClick={() => navigate("/catalogue")}
                        className="flex-1 flex items-center justify-center gap-2 rounded-md border border-[#dca543] bg-white py-2.5 text-sm font-bold text-[#dca543] transition hover:bg-[#fcf7ec]"
                      >
                        Details
                      </button>
                    </div>




                  </div>
                </motion.div>
              )})}
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white">
              <p className="text-center text-slate-500">
                <Package className="mx-auto mb-3 h-10 w-10 opacity-30" />
                No products available at the moment.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* AUTHORITY STRUCTURE */}
      <section className="relative z-10 mx-auto grid max-w-7xl gap-12 px-5 py-24 lg:grid-cols-[0.8fr_1.2fr]">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">Authority structure</p>
          <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">Built around Super Admin control</h2>
          <p className="mt-6 text-lg leading-relaxed text-slate-400">
            The Super Admin creates users, controls product categories, manages
            prices for every role, views revenue, approves orders, and edits the
            retail network from one panel.
          </p>
        </motion.div>
        
        <div className="grid gap-4 sm:grid-cols-2">
          {["Admin", "Super Stockist", "Distributor", "Wholesaler"].map((role, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10" 
              key={role}
            >
              <div className="mb-4 flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-orange-400">
                <BadgeCheck className="h-5 w-5" />
                {role}
              </div>
              <p className="text-sm leading-relaxed text-slate-300">
                Credentials are issued by Super Admin. Access is clean,
                controlled, and ready for role-wise pricing and order workflows.
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA / FOOTER */}
      <section className="relative overflow-hidden border-t border-white/10 bg-[#070B1A] py-20">
        <div className="absolute inset-0 z-0">
          <img
            alt="Retail store aisle"
            className="h-full w-full object-cover opacity-10 mix-blend-overlay"
            src="https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1600&q=82"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070B1A] to-transparent" />
        </div>
        
        <div className="relative z-10 mx-auto max-w-4xl px-5 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500/20 text-orange-400 shadow-[0_0_30px_rgba(234,88,12,0.2)]">
            <Building2 className="h-8 w-8" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">Ready for retail growth</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
            Contact {brand.name} for FMCG product supply, order support, and
            retailer network management.
          </p>
          
          <div className="mt-8 flex flex-col items-center justify-center gap-4 text-sm font-medium text-slate-300 sm:flex-row sm:gap-8">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-orange-500"></div>
              {brand.phone}
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-orange-500"></div>
              {brand.email}
            </div>
          </div>
          
          <div className="mt-10">
            <button 
              onClick={() => navigate("/login")} 
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-black transition hover:scale-105 hover:bg-slate-200"
            >
              Login to Platform
              <ShieldCheck className="h-5 w-5" />
            </button>
          </div>
          
          <div className="mt-20 border-t border-white/10 pt-8 text-sm text-slate-500">
            &copy; {new Date().getFullYear()} {brand.name}. All rights reserved.
          </div>
        </div>
      </section>
    </main>
  );
}
