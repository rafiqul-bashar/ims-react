import {
  DashboardWelcome,
  InventorySummery,
  OrderSummery,
  SalesOverview,
  StocksSummery,
} from "@/components/DashboardPage";
import { useAuthStore } from "@/store/authStore";

export default function HomePage() {
  const { USERDATA } = useAuthStore((state) => state);
  return (
    <main className="sm:px-6 p-4">
      <DashboardWelcome userData={USERDATA} />
      <div className="grid grid-cols-5 gap-4 mt-4">
        <div className=" col-span-3 space-y-4">
          <SalesOverview />
          <div className="h-40 bg-green-100">OrderSummery</div>
        </div>
        <div className="col-span-2 flex flex-col gap-4">
          <InventorySummery />
          <OrderSummery />
          <StocksSummery />
        </div>
      </div>
    </main>
  );
}
