import { Badge } from "../ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

export default function DashboardWelcome({ userData }) {
  const { store } = userData || {};
  return (
    <section>
      <Card x-chunk="dashboard-06-chunk-0" className="rounded-none w-full">
        <CardHeader>
          <div className="flex">
            <div className="flex gap-2 items-center">
              <CardTitle className="text-3xl font-semibold tracking-wide">
                <span>{store?.name}</span>{" "}
              </CardTitle>
              <Badge variant="default">Now Active</Badge>
            </div>
          </div>
          <CardDescription className="text-xl text-gray-600 font-medium py-2">
            Showing all data from {store?.name}.
          </CardDescription>
        </CardHeader>
      </Card>
    </section>
  );
}
