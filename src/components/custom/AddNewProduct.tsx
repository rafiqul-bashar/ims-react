import React from "react";
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
export default function AddNewProduct() {
  const [image, setImage] = React.useState(null);

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
  return (
    <>
      <DialogHeader>
        <DialogTitle>Add new product</DialogTitle>
        <DialogDescription>
          Make changes to your products here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
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
        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="name" className="text-right text-sm">
            Name
          </label>
          <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="description" className="text-right text-sm">
            Description
          </label>
          <Textarea
            placeholder="Type your message here."
            defaultValue="High-performance laptop with Intel Core i7 processor and 16GB RAM"
            className="col-span-3"
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="category" className="text-right text-sm">
            Category
          </label>
          <Input
            type="text"
            id="category"
            defaultValue="Electronics"
            className="col-span-3"
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="unitPrice" className="text-right text-sm">
            Unit Price
          </label>
          <Input
            type="number"
            id="unitPrice"
            defaultValue="1200.00"
            min="0"
            step="0.01"
            className="col-span-3"
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="quantity" className="text-right text-sm">
            Quantity Available
          </label>
          <Input
            type="number"
            id="quantity"
            defaultValue="50"
            min="0"
            className="col-span-3"
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </>
  );
}
