import React from "react";
import { ListFilter, PlusCircle, Search } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
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
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
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
import AddNewProduct from "@/components/custom/AddNewProduct";
import { Link } from "react-router-dom";

export default function AllProductsPage() {
  const [products, setProducts] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [startIndex, setStartIndex] = React.useState(0);
  const rowsPerPage = 10;
  const [endIndex, setEndIndex] = React.useState(rowsPerPage);
  const [searchTerm, setSearchTerm] = React.useState("");
  const numbersArray = Array.from(
    { length: products?.length / rowsPerPage },
    (_, index) => index + 1
  );
  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

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
  const filterProducts = () => {
    if (!searchTerm) {
      // If no search query, return all products
      return products;
    }

    return products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <Dialog>
      <div className="flex flex-col sm:gap-4 sm:py-4  overflow-x-scroll ">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <form onSubmit={handleSearch}>
            <div className="relative ml-auto flex-1 md:grow-0">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
              />
            </div>
          </form>
          <div className="flex items-center">
            <div className="ml-auto flex items-center gap-2">
              <DialogTrigger asChild>
                <Button size="sm" className="h-8 gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Product
                  </span>
                </Button>
              </DialogTrigger>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <ListFilter className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Filter
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked>
                    Active
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {/*  modal for creating new product */}
          <DialogContent className="md:max-w-xl">
            <AddNewProduct />
          </DialogContent>
          {/* showing products list */}
          <Card x-chunk="dashboard-06-chunk-0" className="rounded-none w-full">
            <CardHeader>
              <CardTitle>Products</CardTitle>
              <CardDescription>
                Manage your products and view their sales performance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                      <span className="sr-only">img</span>
                    </TableHead>
                    <TableHead>Products</TableHead>
                    <TableHead>Buying Prices</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Quantity
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Availability
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Categories
                    </TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filterProducts()
                    ?.slice(startIndex, endIndex)
                    .map((product, i) => (
                      <TableRow key={i}>
                        <TableCell className="hidden sm:table-cell">
                          <img
                            alt={product?.title}
                            className="aspect-square rounded-md object-cover"
                            height="64"
                            src={product?.image}
                            width="64"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          <Link
                            to={`/products/${product?.id}`}
                            state={{ product }}
                          >
                            {product?.title}
                          </Link>
                        </TableCell>
                        <TableCell className="capitalize">
                          $ {product?.price}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          40 items
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          Low Stock
                        </TableCell>
                        <TableCell className="hidden md:table-cell capitalize">
                          {product?.category}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-none text-xs  px-4 py-1"
                            >
                              Edit
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              className="rounded-none text-xs  px-4 py-1"
                            >
                              Delete
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
                          endIndex === products?.length
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
                of <strong>{filterProducts()?.length}</strong> products
              </div>
            </CardFooter>
          </Card>
        </main>
      </div>
    </Dialog>
  );
}
// Define a loader function to fetch the posts
