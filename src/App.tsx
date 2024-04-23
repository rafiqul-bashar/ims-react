import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import {
  Layout,
  HomePage,
  LoginPage,
  AllProductsPage,
  SingleProductPage,
  NotFound,
  SettingsPage,
  RegisterPage,
  ManageStores,
  ReportPage,
  SuppliersPage,
  OrderPage,
} from "./pages";
import PrivateRoutes from "./components/custom/PrivateRoutes";
import PublicRoutes from "./components/custom/PublicRoutes";

function App() {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<HomePage />} />
          <Route path="products" element={<AllProductsPage />} />
          <Route path="products/:id" element={<SingleProductPage />} />
          <Route path="reports" element={<ReportPage />} />
          <Route path="suppliers" element={<SuppliersPage />} />
          <Route path="orders" element={<OrderPage />} />
          <Route path="manage-store" element={<ManageStores />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Route>
      <Route element={<PublicRoutes />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
