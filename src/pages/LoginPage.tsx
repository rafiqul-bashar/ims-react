import React from "react";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { GoalIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuthStore } from "@/store/authStore";
import { adminUser } from "@/utils/constants";

const schema = z.object({
  email: z.string({ invalid_type_error: "Email should not be empty" }).email(),
  password: z
    .string({ invalid_type_error: "Password should not be empty" })
    .min(6),
});

export default function LoginPage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const setUser = useAuthStore((state) => state.SAVE_USER_TO_STORE);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const loginWithGoogle = () => {
    alert("Google Login");
  };
  const processForm = async (data) => {
    setIsSubmitting(true);
    try {
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      reset();
      setIsSubmitting(false);
    }
  };

  const handleDemoLogin = () => {
    setUser(adminUser);
  };

  console.log("login page");
  return (
    <section className=" w-sceen h-screen grid content-center">
      <div className="max-w-3xl w-full mx-auto flex flex-col md:flex-row md:items-center md:justify-center ">
        <img
          alt=""
          src="/Logo.png"
          className="hidden md:block scale-75 mx-auto"
        />
        <main className="md:ml-auto">
          <form onSubmit={handleSubmit(processForm)}>
            <Card className="mx-auto md:w-[30vw]  text-gray-800  border-0 rounded-none">
              <CardHeader className="space-y-2">
                <img
                  alt=""
                  src="/Logo.png"
                  className="mx-auto my-4 w-16 h-20"
                />
                <CardTitle className="text-2xl font-semibold text-center">
                  Log in to your account
                </CardTitle>
                <CardDescription className="text-center">
                  Welcome back! Please enter your details.
                </CardDescription>
              </CardHeader>

              <CardContent className="flex flex-col gap-3">
                <p className="text-sm py-2 text-gray-600">
                  * All the CRUD operation in disabled in Demo account
                </p>
                <label>Email</label>
                <Input
                  {...register("email", { required: true })}
                  name="email"
                  type="email"
                />

                {errors.email && (
                  <div className="text-red-500">{errors.email.message}</div>
                )}
                <label>Password</label>
                <Input
                  {...register("password", { required: true, minLength: 6 })}
                  name="password"
                  type="password"
                />
                {errors.password && (
                  <div className="text-red-500">
                    <span>Password should be 6 characters minimum</span>
                  </div>
                )}
                <Button disabled={isSubmitting} type="submit">
                  {isSubmitting ? "Loading..." : "Log In"}
                </Button>

                <Button
                  onClick={loginWithGoogle}
                  className="w-full"
                  variant="secondary"
                >
                  <GoalIcon className="mr-2" />
                  Sign In with Google
                </Button>

                <Button onClick={handleDemoLogin}>Demo Account</Button>

                <p className="text-gray-600 text-sm text-center">
                  New Here?{" "}
                  <span className="text-blue-500 font-semibold">
                    <Link to="/register"> Create an account</Link>
                  </span>
                </p>
              </CardContent>
            </Card>
          </form>
        </main>
      </div>
    </section>
  );
}
