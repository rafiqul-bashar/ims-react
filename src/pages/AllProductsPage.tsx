import React from "react";
import { ListFilter, PlusCircle, Search } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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

import { Link } from "react-router-dom";
import { useProductStore } from "@/store/productSlice";
import { LineWave, RotatingLines } from "react-loader-spinner";
import { countCategories } from "@/utils/countFunctions";
import AddNewProduct from "@/components/custom/AddNewProduct";

const sortingOptions = [
  { label: "All", value: "" },
  { label: "Price (High to Low)", value: "321" },
  { label: "Price (Low to High)", value: "123" },
  { label: "Categories", value: "categories" },
];

export default function AllProductsPage() {
  const products = useProductStore((state) => state.products);
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const [sortBy, setSortBy] = React.useState("");
  const [selectedProduct, setSelectedProduct] = React.useState({});
  const [currentPage, setCurrentPage] = React.useState(1);
  const [startIndex, setStartIndex] = React.useState(0);
  const rowsPerPage = 10;
  const [endIndex, setEndIndex] = React.useState(rowsPerPage);
  const [searchTerm, setSearchTerm] = React.useState("");
  React.useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filterProducts = () => {
    let filteredProducts = [...products];

    // filter by search
    if (searchTerm) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    // Sort products based on sorting criteria
    if (sortBy === "321") {
      filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortBy === "123") {
      filteredProducts.sort((a, b) => a.price - b.price);
    }

    return filteredProducts;
  };
  console.log(sortBy);
  // pagination
  const numbersArray = Array.from(
    { length: filterProducts()?.length / rowsPerPage },
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

  const handleDeleteClick = () => {
    alert(`Delete ${selectedProduct.id}`);
  };
  return (
    <Dialog>
      <AlertDialog>
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
              </div>
            </div>
          </header>
          {/* overall inventory details */}

          <section className="sm:px-6 p-4">
            <Card
              x-chunk="dashboard-06-chunk-0"
              className="rounded-none w-full"
            >
              <CardHeader>
                <CardTitle className="text-gray-700">
                  Overall Inventory
                </CardTitle>
              </CardHeader>
              <div className="container  grid grid-cols-4 pb-4 ">
                <div className=" ">
                  <h1 className="font-medium tracking-tight text-blue-500">
                    Categories
                  </h1>
                  {products.length === 0 ? (
                    <LineWave
                      visible={true}
                      height="80"
                      width="80"
                      color="#4fa94d"
                      ariaLabel="line-wave-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                      firstLineColor=""
                      middleLineColor=""
                      lastLineColor=""
                    />
                  ) : (
                    <h2 className="font-semibold  mt-3">
                      {countCategories(products)}
                    </h2>
                  )}
                </div>
                <div className="">
                  <h1 className="font-medium tracking-tight text-[#E19133]">
                    Total Products
                  </h1>
                  {products.length === 0 ? (
                    <LineWave
                      visible={true}
                      height="80"
                      width="80"
                      color="#4fa94d"
                      ariaLabel="line-wave-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                      firstLineColor=""
                      middleLineColor=""
                      lastLineColor=""
                    />
                  ) : (
                    <h2 className="font-semibold  mt-3">{products?.length}</h2>
                  )}
                </div>
                <div className="">
                  <h1 className="font-medium tracking-tight text-[#F36960]">
                    Low Stock
                  </h1>
                  {products.length === 0 ? (
                    <LineWave
                      visible={true}
                      height="80"
                      width="80"
                      color="#4fa94d"
                      ariaLabel="line-wave-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                      firstLineColor=""
                      middleLineColor=""
                      lastLineColor=""
                    />
                  ) : (
                    <h2 className="font-semibold  mt-3">14</h2>
                  )}
                </div>
                <div className="">
                  <h1 className="font-medium tracking-tight text-blue-500">
                    Categories
                  </h1>
                  {products.length === 0 ? (
                    <LineWave
                      visible={true}
                      height="80"
                      width="80"
                      color="#4fa94d"
                      ariaLabel="line-wave-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                      firstLineColor=""
                      middleLineColor=""
                      lastLineColor=""
                    />
                  ) : (
                    <h2 className="font-semibold  mt-3">14</h2>
                  )}
                </div>
              </div>
            </Card>
          </section>

          {/* overall details sections ends */}

          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            {/*  modal for creating new product */}
            <DialogContent className="md:max-w-xl">
              <AddNewProduct />
            </DialogContent>

            {/* showing products list */}
            <Card
              x-chunk="dashboard-06-chunk-0"
              className="rounded-none w-full"
            >
              <CardHeader>
                <div className="flex  items-end justify-between">
                  <div>
                    <CardTitle className="text-gray-700">Products</CardTitle>
                    <br />
                    <CardDescription>
                      Manage your products and view their sales performance.
                    </CardDescription>
                  </div>
                  <div className="ml-auto">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 gap-1"
                        >
                          <ListFilter className="h-3.5 w-3.5" />
                          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Filter
                          </span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {sortingOptions.map((option) => (
                          <DropdownMenuCheckboxItem
                            checked={option.value === sortBy && true}
                            onClick={() => setSortBy(option.value)}
                            key={option.label}
                          >
                            {option.label}
                          </DropdownMenuCheckboxItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  {products.length !== 0 && (
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
                  )}
                  <TableBody>
                    {products.length === 0 && (
                      <>
                        <div className="w-fit py-20   mx-auto">
                          <RotatingLines
                            visible={true}
                            height="96"
                            width="96"
                            color="grey"
                            strokeWidth="5"
                            animationDuration="0.75"
                            ariaLabel="rotating-lines-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                          />
                        </div>
                      </>
                    )}
                    {products.length !== 0 &&
                      filterProducts()
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
                                <Link
                                  to={`/products/${product?.id}`}
                                  state={{ product, edit: true }}
                                >
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="rounded-none text-xs  px-4 py-1"
                                  >
                                    Edit
                                  </Button>
                                </Link>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    onClick={() => setSelectedProduct(product)}
                                    variant="destructive"
                                    size="sm"
                                    className="rounded-none text-xs  px-4 py-1"
                                  >
                                    Delete
                                  </Button>
                                </AlertDialogTrigger>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                  </TableBody>
                </Table>
                <Pagination>
                  {filterProducts()?.length > 10 && (
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
                            className={
                              currentPage === number ? "bg-gray-200" : ""
                            }
                            variant={
                              currentPage === number ? "outline" : "ghost"
                            }
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
                            endIndex === filterProducts()?.length
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
                    <strong>All </strong>
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

        {/*  Delete Product Dialog */}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              product and remove the data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteClick}
              className="bg-red-500 hover:bg-red-500 hover:bg-red-500/80"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  );
}
