import React from "react";

import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function DeleteProduct() {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Delete Product</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete this product?
        </DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <Button variant="destructive">Yes</Button>
        <Button variant="outline">Cancel</Button>
      </DialogFooter>
    </>
  );
}
