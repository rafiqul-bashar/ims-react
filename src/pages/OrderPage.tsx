import React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { EyeIcon, Search, View } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const orders = [
  {
    orderName: "Smartphone",
    orderTotal: 599.99,
    quantity: 1,
    orderId: "ORD123456",
    expectedDelivery: "2024-04-25",
    status: "confirmed",
  },
  {
    orderName: "Laptop",
    orderTotal: 899.99,
    quantity: 1,
    orderId: "ORD654321",
    expectedDelivery: "2024-04-24",
    status: "on the way",
  },
  {
    orderName: "Headphones",
    orderTotal: 99.99,
    quantity: 2,
    orderId: "ORD789012",
    expectedDelivery: "2024-04-28",
    status: "delayed",
  },
  {
    orderName: "Smartwatch",
    orderTotal: 249.99,
    quantity: 1,
    orderId: "ORD246813",
    expectedDelivery: "2024-04-26",
    status: "confirmed",
  },
  {
    orderName: "Tablet",
    orderTotal: 349.99,
    quantity: 1,
    orderId: "ORD135792",
    expectedDelivery: "2024-04-27",
    status: "on the way",
  },
  {
    orderName: "Camera",
    orderTotal: 449.99,
    quantity: 1,
    orderId: "ORD987654",
    expectedDelivery: "2024-04-29",
    status: "delayed",
  },
  {
    orderName: "Wireless Earbuds",
    orderTotal: 79.99,
    quantity: 2,
    orderId: "ORD456789",
    expectedDelivery: "2024-04-30",
    status: "confirmed",
  },
  {
    orderName: "External Hard Drive",
    orderTotal: 129.99,
    quantity: 1,
    orderId: "ORD654987",
    expectedDelivery: "2024-05-01",
    status: "on the way",
  },
  {
    orderName: "Gaming Console",
    orderTotal: 399.99,
    quantity: 1,
    orderId: "ORD123789",
    expectedDelivery: "2024-05-02",
    status: "delayed",
  },
  {
    orderName: "Printer",
    orderTotal: 199.99,
    quantity: 1,
    orderId: "ORD987123",
    expectedDelivery: "2024-05-03",
    status: "confirmed",
  },
  {
    orderName: "Wireless Router",
    orderTotal: 89.99,
    quantity: 1,
    orderId: "ORD789654",
    expectedDelivery: "2024-05-04",
    status: "on the way",
  },
  {
    orderName: "Smart Speaker",
    orderTotal: 149.99,
    quantity: 1,
    orderId: "ORD321789",
    expectedDelivery: "2024-05-05",
    status: "delayed",
  },
  {
    orderName: "Monitor",
    orderTotal: 299.99,
    quantity: 1,
    orderId: "ORD789456",
    expectedDelivery: "2024-05-06",
    status: "confirmed",
  },
  {
    orderName: "Keyboard",
    orderTotal: 49.99,
    quantity: 2,
    orderId: "ORD987456",
    expectedDelivery: "2024-05-07",
    status: "on the way",
  },
  {
    orderName: "Mouse",
    orderTotal: 29.99,
    quantity: 3,
    orderId: "ORD456123",
    expectedDelivery: "2024-05-08",
    status: "delayed",
  },
  {
    orderName: "Power Bank",
    orderTotal: 39.99,
    quantity: 2,
    orderId: "ORD654321",
    expectedDelivery: "2024-05-09",
    status: "confirmed",
  },
  {
    orderName: "USB Flash Drive",
    orderTotal: 19.99,
    quantity: 5,
    orderId: "ORD123789",
    expectedDelivery: "2024-05-10",
    status: "on the way",
  },
  {
    orderName: "Webcam",
    orderTotal: 69.99,
    quantity: 1,
    orderId: "ORD789654",
    expectedDelivery: "2024-05-11",
    status: "delayed",
  },
  {
    orderName: "Ethernet Cable",
    orderTotal: 9.99,
    quantity: 10,
    orderId: "ORD321789",
    expectedDelivery: "2024-05-12",
    status: "confirmed",
  },
  {
    orderName: "HDMI Cable",
    orderTotal: 14.99,
    quantity: 5,
    orderId: "ORD789456",
    expectedDelivery: "2024-05-13",
    status: "on the way",
  },
  // Add more orders as needed
];

export default function OrderPage() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [startIndex, setStartIndex] = React.useState(0);
  const rowsPerPage = 10;
  const [endIndex, setEndIndex] = React.useState(rowsPerPage);
  const [searchTerm, setSearchTerm] = React.useState("");

  const numbersArray = Array.from(
    { length: orders?.length / rowsPerPage },
    (_, index) => index + 1
  );
  const handlePaginationIndex = (direction) => {
    if (direction === "prev") {
      setStartIndex(startIndex - rowsPerPage);
      setEndIndex(endIndex - rowsPerPage);
      setCurrentPage(currentPage - 1);
    } else {
      setStartIndex(startIndex + rowsPerPage); //10
      setEndIndex(endIndex + rowsPerPage); //10 + 10 = 20
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePaginationNumberButtons = (i) => {
    setCurrentPage(i + 1);
    setStartIndex(i * rowsPerPage);
    setEndIndex(i * rowsPerPage + rowsPerPage);
  };
  const handleSearch = (e) => {
    e.preventDefault();
  };

  const filterOrders = () => {
    if (!searchTerm) {
      // If no search query, return all orders
      return orders;
    }

    return orders.filter((order) =>
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // colorize order status

  function getStatusColor(status) {
    switch (status) {
      case "confirmed":
        return "text-green-600";
      case "delayed":
        return "text-yellow-600";
      case "on the way":
        return "text-blue-500";
      default:
        return "";
    }
  }
  return (
    <div className="flex flex-col sm:gap-4 sm:py-4  overflow-x-scroll ">
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        {/* showing orders list */}
        <Card x-chunk="dashboard-06-chunk-0" className="rounded-none w-full">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Orders</CardTitle>
                <br />
                <CardDescription>Find and manage orders.</CardDescription>
              </div>
              <form onSubmit={handleSearch}>
                <div className="relative ml-auto flex-1 md:grow-0">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search Order ID"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                  />
                </div>
              </form>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Products</TableHead>
                  <TableHead>Order Value</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Quantity
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Order ID
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Expected Delivery
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filterOrders()
                  ?.slice(startIndex, endIndex)
                  .map((order, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">
                        <Link
                          to={`/orders/${order?.orderId}`}
                          state={{ order }}
                        >
                          {order?.orderName}
                        </Link>
                      </TableCell>
                      <TableCell className="capitalize">
                        $ {order?.orderTotal}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {order?.quantity}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {order.orderId}
                      </TableCell>
                      <TableCell className="hidden md:table-cell capitalize">
                        {order?.expectedDelivery}
                      </TableCell>
                      <TableCell className="hidden md:table-cell capitalize">
                        <span
                          className={`font-medium ${getStatusColor(
                            order?.status
                          )}`}
                        >
                          {order?.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-none text-xs  px-4 py-1 "
                          >
                            <EyeIcon className="h-4 w-4" />
                            <span className="ml-2">Details</span>
                          </Button>
                          <Button
                            variant="secondary"
                            size="sm"
                            className="rounded-none text-xs  px-4 py-1"
                          >
                            Update Status
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <Pagination>
              {!searchTerm && (
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      className={
                        startIndex === 0
                          ? "pointer-events-none opacity-50"
                          : undefined
                      }
                      onClick={() => {
                        handlePaginationIndex("prev");
                      }}
                    />
                  </PaginationItem>
                  <PaginationItem>
                    {numbersArray.map((number, i) => (
                      <Button
                        className={currentPage === number ? "bg-gray-50" : ""}
                        variant={currentPage === number ? "outline" : "ghost"}
                        key={number}
                        onClick={() => handlePaginationNumberButtons(i)}
                      >
                        {number}
                      </Button>
                    ))}
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      className={
                        endIndex === orders?.length
                          ? "pointer-events-none opacity-50"
                          : undefined
                      }
                      onClick={() => {
                        handlePaginationIndex("next");
                      }}
                    />
                  </PaginationItem>
                </PaginationContent>
              )}
            </Pagination>
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground">
              Showing{" "}
              {searchTerm ? (
                <strong>all </strong>
              ) : (
                <strong>
                  {startIndex + 1}-{endIndex}{" "}
                </strong>
              )}
              of <strong>{filterOrders()?.length}</strong> orders
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
