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
  SingleStoreSetting,
} from "./pages";
import PrivateRoutes from "./components/custom/PrivateRoutes";
import PublicRoutes from "./components/custom/PublicRoutes";
import CheckingForStore from "./components/custom/CheckingForStore";

function App() {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<Layout />}>
          <Route
            path=""
            element={
              <CheckingForStore>
                <HomePage />
              </CheckingForStore>
            }
          />
          <Route
            path="products"
            element={
              <CheckingForStore>
                <AllProductsPage />
              </CheckingForStore>
            }
          />
          <Route
            path="products/:id"
            element={
              <CheckingForStore>
                <SingleProductPage />
              </CheckingForStore>
            }
          />
          <Route
            path="reports"
            element={
              <CheckingForStore>
                <ReportPage />
              </CheckingForStore>
            }
          />
          <Route
            path="suppliers"
            element={
              <CheckingForStore>
                <SuppliersPage />
              </CheckingForStore>
            }
          />
          <Route
            path="orders"
            element={
              <CheckingForStore>
                <OrderPage />
              </CheckingForStore>
            }
          />
          <Route path="manage-store" element={<ManageStores />} />
          <Route path="manage-store/:name" element={<SingleStoreSetting />} />
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
