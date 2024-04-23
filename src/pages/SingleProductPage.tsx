import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, StepBack } from "lucide-react";
import React from "react";
import { useParams } from "react-router-dom";

export default function SingleProductPage() {
  const [product, setProduct] = React.useState({});
  const { id } = useParams();
  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        console.log(data);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [id]);

  return (
    <>
      <main className="p-4 sm:px-6 ">
        <Card
          x-chunk="dashboard-06-chunk-0"
          className="rounded-none w-full p-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button size="sm" className="h-8 gap-1  mr-3" variant="ghost">
                <ArrowLeft className="h-3.5 w-3.5" />
                <p className="sr-only sm:not-sr-only sm:whitespace-nowrap underline ">
                  Back to products
                </p>
              </Button>
              <h1>{product?.title}</h1>
            </div>
            <Button variant="outline">Edit</Button>
          </div>
          <h3 className=" font-medium tracking-tight text-gray-700">
            Overview
          </h3>
          <Separator className="my-4" />
          {/*  products details overview */}

          <div className="grid grid-cols-3 ">
            <div className="col-span-2 flex flex-col space-y-4 text-[#48505E]">
              {/* text descriptions */}
              <div className="grid grid-cols-2  ">
                <p className="font-semibold ">Product Name</p>
                <p className="mr-auto"> {product?.title} </p>
              </div>
              <div className="grid grid-cols-2 ">
                <p className="font-semibold ">Product Id</p>
                <p className="mr-auto"> {product?.id} </p>
              </div>
              <div className="grid grid-cols-2 ">
                <p className="font-semibold ">Product Category</p>
                <p className="mr-auto"> {product?.category} </p>
              </div>
              <div className="grid grid-cols-2 ">
                <p className="font-semibold ">Product Unit Price</p>
                <p className="mr-auto"> {product?.price} </p>
              </div>
            </div>

            {/* image and stocks */}
            <div className="flex flex-col space-y-4  text-gray-600">
              <img
                src={product?.image}
                alt={product?.title}
                className="w-32 h-32 mx-auto p-4 border-dashed border-2 border-gray-400 mb-2"
              />
              <div className="grid grid-cols-2 px-8 ">
                <p>Opening Stock</p>
                <p className="text-right">40 </p>
              </div>
              <div className="grid grid-cols-2 px-8">
                <p>Remaining Stock</p>
                <p className="text-right">40 </p>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </>
  );
}
