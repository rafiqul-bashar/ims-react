import CreateStore from "@/components/ManageStorePage/CreateStore";
import StoreItem from "@/components/ManageStorePage/StoreItem";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthStore } from "@/store/authStore";

export default function ManageStores() {
  const { USERDATA } = useAuthStore((state) => state);

  if (!USERDATA?.store?.id) {
    return <CreateStore />;
  } else {
    return (
      <section>
        <Card x-chunk="dashboard-06-chunk-0" className="rounded-none w-full">
          <CardHeader>
            <div className="flex  items-end justify-between">
              <div>
                <CardTitle className="text-gray-700">Manage Stores</CardTitle>
                <br />
                <CardDescription>
                  Manage your store in one place.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <StoreItem store />
          </CardContent>
        </Card>
      </section>
    );
  }
}
