import { Button } from "@/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";
const schema = z.object({
  name: z.string({ invalid_type_error: "Email should not be empty" }).min(8),
  location: z.string({ invalid_type_error: "Enter valid address" }).min(10),
});

export default function SingleStoreSetting() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { SAVE_USER_TO_STORE, USERDATA } = useAuthStore((state) => state);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const processForm = async (data) => {
    const { name, location } = data;
    setIsSubmitting(true);
    let newUserData = USERDATA;
    newUserData = { ...USERDATA, store: { id: 1, name, location } };
    try {
      SAVE_USER_TO_STORE(newUserData);
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      reset();
      setIsSubmitting(false);
    }
  };
  console.log(USERDATA);
  return (
    <Dialog>
      <main
        x-chunk="dashboard-06-chunk-0"
        className="rounded-none w-full h-fit "
      >
        <CardHeader className=" text-center">
          <div className="py-40 ">
            <CardTitle className="text-gray-700 text-2xl md:text-4xl ">
              You have no stores.
            </CardTitle>
            <br />
            <CardDescription className="md:text-2xl">
              Your must create a store to continue .
            </CardDescription>
            <br />
            <DialogTrigger asChild>
              <Button variant="black">Create New Store</Button>
            </DialogTrigger>
          </div>
        </CardHeader>
        {/* Edit Modal */}

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New Store</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(processForm)}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Store Name
                </Label>
                <Input
                  {...register("name", { required: true })}
                  name="name"
                  placeholder="Your Shop"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">
                  Address
                </Label>
                <Input
                  {...register("location", { required: true })}
                  name="location"
                  placeholder="Your Shop Address"
                  className="col-span-3"
                />
              </div>
            </div>
            {errors.name || errors.location ? (
              <div className="text-red-500">
                <span>{errors && "Plase enter valid name and address."}</span>
              </div>
            ) : (
              ""
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
      </main>
    </Dialog>
  );
}
