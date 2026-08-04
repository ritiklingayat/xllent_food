import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, ArrowLeft, Building2, PackageCheck } from "lucide-react";
import { productService } from "@/features/products/services/productService";

export default function PublicProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await productService.fetchProducts();
        const productArray = Array.isArray(data) ? data : data?.products || [];
        const activeProducts = productArray.filter(
          product => !product.status || String(product.status).toUpperCase() === "ACTIVE"
        );
        setProducts(activeProducts);
      } catch (err) {
        console.error("Failed to load products for public catalogue", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
    window.addEventListener("focus", fetchProducts);

    return () => window.removeEventListener("focus", fetchProducts);
  }, []);

  return (
    <main className="min-h-screen bg-[#fdfbf7] text-slate-800 font-sans">
      
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <button 
            onClick={() => navigate("/")} 
            className="flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-orange-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </button>
          
          <div className="text-lg font-bold tracking-tight text-slate-900" style={{ fontFamily: "serif" }}>
            Product Catalogue
          </div>
        </div>
      </header>

      {/* CATALOGUE CONTENT */}
      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-slate-900 md:text-5xl" style={{ fontFamily: "serif" }}>Our Premium Products</h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Browse the complete range of premium FMCG products supplied by Xllent Retailers, crafted for every kitchen and business need.
          </p>
        </div>

        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
              <div key={n} className="h-96 animate-pulse rounded-xl bg-white shadow-sm border border-slate-100" />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product, idx) => {
              const productImg = product.image || product.imageUrl || product.thumbnail || (product.images && product.images[0]);
              const productPrice =  product.mrp
              const productName = product.productName || product.name || "Unknown Product";
              const productCategory = product.categoryName || product.category || "General";

              return (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={product.id || product._id || idx}
                  className="flex flex-col overflow-hidden rounded-xl bg-white shadow-sm border border-slate-200 transition-all hover:shadow-lg"
                >
                  <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
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
                    <div className="absolute top-3 left-3 rounded-full bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-800 shadow-sm">
                      {productCategory}
                    </div>
                  </div>
                  
                  <div className="flex flex-col flex-1 p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-slate-900 line-clamp-2" style={{ fontFamily: "serif" }}>{productName}</h3>
                      <div className="text-right pl-3">
                        <div className="text-lg font-bold text-slate-900">₹{productPrice}</div>
                        {product.mrp && product.mrp > productPrice && (
                          <div className="text-[10px] text-slate-400 line-through">₹{product.mrp}</div>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-xs text-slate-500 line-clamp-2 mb-4">
                      {product.description || `Premium quality ${productName} crafted for the best experience.`}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4 mt-auto">
                      {["Pieces: " + (product.pieces || "1"), "Packets: " + (product.packets || "1")].map(tag => (
                        <span key={tag} className="rounded border border-slate-200 px-2 py-0.5 text-[10px] text-slate-600">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-2 pt-3 border-t border-slate-100">
                      <button className="flex-[2] flex items-center justify-center gap-1.5 rounded bg-[#dca543] py-2 text-xs font-bold text-white transition hover:bg-[#c69138]">
                        <PackageCheck className="h-3.5 w-3.5" />
                        Add
                      </button>
                      <button className="flex-1 flex items-center justify-center rounded border border-[#dca543] bg-white py-2 text-xs font-bold text-[#dca543] transition hover:bg-[#fcf7ec]">
                        Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white">
            <Package className="mb-4 h-12 w-12 text-slate-300" />
            <h3 className="text-lg font-bold text-slate-700">No products found</h3>
            <p className="mt-2 text-sm text-slate-500">The catalogue is currently empty.</p>
          </div>
        )}
      </section>
      
      {/* FOOTER */}
      <footer className="mt-12 border-t border-white/10 bg-[#070B1A] py-10 text-center">
        <Building2 className="mx-auto mb-4 h-8 w-8 text-slate-600" />
        <p className="text-sm text-slate-500">
          &copy; {new Date().getFullYear()} Xllent Retailers. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
