import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import DashboardLayout from "@/layouts/DashboardLayout";

import RoleGuard from "@/auth/RoleGuard";
import PermissionGuard from "@/auth/PermissionGuard";

import { ROLES } from "@/config/roles";
import { PERMISSIONS } from "@/config/permissions";

/* =====================================================
   Lazy Pages
===================================================== */

const Dashboard = lazy(() =>
  import("@/features/dashboard/DashboardPage")
);

const Products = lazy(() =>
  import("@/features/dashboard/products/Products")
);

const ProductForm = lazy(() =>
  import("@/features/dashboard/products/ProductForm")
);

const Categories = lazy(() =>
  import("@/features/dashboard/categories/Categories")
);

const Orders = lazy(() =>
  import("@/features/dashboard/orders/Orders")
);

const Inventory = lazy(() =>
  import("@/features/dashboard/inventory/Inventory")
);

const Customers = lazy(() =>
  import("@/features/dashboard/customers/Customers")
);

const CustomerForm = lazy(() =>
  import("@/features/dashboard/customers/CustomerForm")
);

const Users = lazy(() =>
  import("@/features/dashboard/users/Users")
);

const Analytics = lazy(() =>
  import("@/features/dashboard/analytics/Analytics")
);

/* =====================================================
   Page Loader
===================================================== */

function PageLoader() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
    </div>
  );
}

/* =====================================================
   Dashboard Routes
===================================================== */

export default function DashboardRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<DashboardLayout />}>
          {/* Dashboard */}
          <Route
            index
            element={<Dashboard />}
          />

          {/* Products */}
          <Route
            path="products"
            element={
              <RoleGuard
                roles={[
                  ROLES.SUPER_ADMIN,
                  ROLES.ADMIN,
                ]}
              >
                <PermissionGuard
                  permission={PERMISSIONS.PRODUCT_VIEW}
                >
                  <Products />
                </PermissionGuard>
              </RoleGuard>
            }
          />

          <Route
            path="products/create"
            element={
              <RoleGuard
                roles={[
                  ROLES.SUPER_ADMIN,
                  ROLES.ADMIN,
                ]}
              >
                <PermissionGuard
                  permission={PERMISSIONS.PRODUCT_CREATE}
                >
                  <ProductForm />
                </PermissionGuard>
              </RoleGuard>
            }
          />

          <Route
            path="products/edit/:id"
            element={
              <RoleGuard
                roles={[
                  ROLES.SUPER_ADMIN,
                  ROLES.ADMIN,
                ]}
              >
                <PermissionGuard
                  permission={PERMISSIONS.PRODUCT_UPDATE}
                >
                  <ProductForm />
                </PermissionGuard>
              </RoleGuard>
            }
          />

          {/* Categories */}
          <Route
            path="categories"
            element={
              <RoleGuard
                roles={[
                  ROLES.SUPER_ADMIN,
                  ROLES.ADMIN,
                ]}
              >
                <PermissionGuard
                  permission={PERMISSIONS.CATEGORY_VIEW}
                >
                  <Categories />
                </PermissionGuard>
              </RoleGuard>
            }
          />

          {/* Orders */}
          <Route
            path="orders"
            element={
              <PermissionGuard
                permission={PERMISSIONS.ORDER_VIEW}
              >
                <Orders />
              </PermissionGuard>
            }
          />

          {/* Inventory */}
          <Route
            path="inventory"
            element={
              <PermissionGuard
                permission={PERMISSIONS.INVENTORY_VIEW}
              >
                <Inventory />
              </PermissionGuard>
            }
          />

          {/* Customers */}
          <Route
            path="customers"
            element={
              <PermissionGuard
                permission={PERMISSIONS.CUSTOMER_VIEW}
              >
                <Customers />
              </PermissionGuard>
            }
          />

          <Route
            path="customers/create"
            element={
              <PermissionGuard
                permission={PERMISSIONS.CUSTOMER_CREATE}
              >
                <CustomerForm />
              </PermissionGuard>
            }
          />

          {/* Users */}
          <Route
            path="users"
            element={
              <RoleGuard
                roles={[ROLES.SUPER_ADMIN]}
              >
                <PermissionGuard
                  permission={PERMISSIONS.USER_VIEW}
                >
                  <Users />
                </PermissionGuard>
              </RoleGuard>
            }
          />

          {/* Analytics */}
          <Route
            path="analytics"
            element={
              <PermissionGuard
                permission={PERMISSIONS.ANALYTICS_VIEW}
              >
                <Analytics />
              </PermissionGuard>
            }
          />

          {/* Dashboard 404 */}
          <Route
            path="*"
            element={
              <div className="flex h-[70vh] flex-col items-center justify-center">
                <h1 className="text-5xl font-bold">
                  404
                </h1>

                <p className="mt-3 text-slate-500">
                  Page not found
                </p>
              </div>
            }
          />
        </Route>
      </Routes>
    </Suspense>
  );
}