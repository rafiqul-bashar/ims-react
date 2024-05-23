import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

import { useLocation } from "react-router-dom";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { useForm } from "react-hook-form";
const schema = z.object({
  name: z.string({ invalid_type_error: "Email should not be empty" }).min(6),
  location: z.string({ invalid_type_error: "Enter valid address" }).min(10),
});

export default function SingleStoreSetting() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const location = useLocation();
  const storeData = location?.state;

  const processForm = async (data) => {
    setIsSubmitting(true);
    console.log({ raw: data });
    try {
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      reset();
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Dialog>
        <Card x-chunk="dashboard-06-chunk-0" className="rounded-none w-full">
          <CardHeader>
            <div className="flex  items-end justify-between">
              <div className="w-full">
                <CardTitle className="text-gray-700">
                  {storeData?.name}
                </CardTitle>
                <div className="grid grid-cols-2 w-full py-4 mt-3 font-semibold text-lg text-gray-700 ">
                  <p> Details</p>

                  <DialogTrigger asChild>
                    <Button variant="default" className="w-fit">
                      Edit Store
                    </Button>
                  </DialogTrigger>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-3 py-3  text-lg ">
              <h2 className="font-semibold">
                <span className="font-semibold text-gray-600 ">
                  Store Name :
                </span>{" "}
                {storeData?.name}
              </h2>
              <h3>
                {" "}
                <span className="font-semibold text-gray-600 ">
                  Address :
                </span>{" "}
                {storeData?.location}
              </h3>

              <div className="flex items-center gap-2 text-gray-600">
                <p className="font-medium tracking-tight ">Total Products:</p>
                <p className="font-medium tracking-tight text-blue-500 ">114</p>
              </div>

              <div className="flex items-center gap-2">
                <p className="font-medium tracking-tight text-gray-600">
                  Total Orders :
                </p>
                <p className="font-medium tracking-tight  text-green-500">41</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="font-medium tracking-tight text-blue-500">
                  Pending Orders :
                </p>
                <p className="font-medium tracking-tight text-[#E19133]">4</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Edit Modal */}

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit {storeData?.name}</DialogTitle>
            <DialogDescription>
              Make changes to your store here. Click save when you're done.
              <br />
              <span className="text-red-600 block">
                * Once edited data could not be changed
              </span>
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(processForm)}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Store Name
                </Label>
                <Input
                  {...register("name", { required: true })}
                  defaultValue={storeData?.name}
                  name="name"
                  // defaultValue={storeData?.name}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">
                  Address
                </Label>
                <Input
                  {...register("location", { required: true })}
                  defaultValue={storeData?.location}
                  name="location"
                  // defaultValue={storeData?.location}
                  className="col-span-3"
                />
              </div>
            </div>
            {errors && (
              <div className="text-red-500">
                <span>
                  {errors?.name
                    ? "Plase enter valid name"
                    : "Plase enter valid address."}
                </span>
              </div>
            )}

            <DialogFooter>
              <DialogClose>
                <Button disabled={isSubmitting} type="submit">
                  Save changes
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
