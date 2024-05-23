import React from "react";
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useProductStore } from "@/store/productSlice";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

//  form validation

const formSchema = z.object({
  title: z.string().min(5, { message: "Must be 5 or more characters long" }),
  price: z.string().min(1, { message: "Price should be a positive number" }),
  category: z.string(),
  stock: z.string().min(1, { message: "Stock should be a positive number" }), // Stock is optional
  image: z.string().url({ message: "Image URL is not valid" }).optional(), // Image URL is optional and should be a valid URL
});

export default function AddNewProduct() {
  const [image, setImage] = React.useState(null);
  const addProduct = useProductStore((state) => state.addProduct);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      price: "",
      category: "clothing",
      stock: "",
      image: "",
    },
  });
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setImage(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  //  form submitting

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    addProduct(values);
  };
  return (
    <>
      <DialogHeader>
        <DialogTitle>Add new product</DialogTitle>
        <DialogDescription>
          Make changes to your products here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="image" className="text-right text-sm">
                Image
              </label>
              <div className="col-span-3">
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleFileChange}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                />
                {image && (
                  <div>
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Product Image"
                      className="h-32 mx-auto py-2 "
                    />
                  </div>
                )}
              </div>
            </div>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Product Name"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel> Category</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Product Category"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Product Price</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Price per product" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Product Quantity</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Product Quantity" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <Button type="submit">Save changes</Button>
          </div>
        </form>
      </Form>
    </>
  );
}
