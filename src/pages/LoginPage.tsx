import React from "react";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { GoalIcon } from "lucide-react";
import { useUserStore } from "@/store/rootStore";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

//  form validation

const formSchema = z.object({
  emailAddress: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password should be at least 6 characters" }),
});

export default function LoginPage() {
  const loginDataToState = useUserStore((state) => state.login);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailAddress: "",
      password: "",
    },
  });
  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log({ values });
  };

  const handleDemoLogin = () => {
    // Simulated login process, replace this with actual authentication logic
    const userData = {
      id: 1,
      username: "john_doe",
      email: "john@example.com",
      age: 30,
      isAdmin: false,
    };

    // Call the login function from the Zustand user store and pass the user data
    loginDataToState(userData);
  };
  return (
    <section className=" w-sceen h-screen grid content-center">
      <div className="max-w-3xl w-full mx-auto flex flex-col md:flex-row md:items-center md:justify-center ">
        <img
          alt=""
          src="/Logo.png"
          className="hidden md:block scale-75 mx-auto"
        />
        <main className="md:ml-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
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
                <CardContent>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="emailAddress"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>Email address</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Email address"
                                type="email"
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
                      name="password"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Password"
                                type="password"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                    <div className="flex items-center justify-between text-sm text-blue-600">
                      <Link to="#"> Forgot Password?</Link>
                    </div>
                    <Button className="w-full" type="submit">
                      Login
                    </Button>
                    <Button
                      onClick={handleDemoLogin}
                      className="w-full"
                      type="submit"
                    >
                      Demo Account
                    </Button>
                    <Button className="w-full" type="submit" variant="outline">
                      <GoalIcon className="mr-2" />
                      Sign In with Google
                    </Button>
                    <p className="text-gray-600 text-sm text-center">
                      Dont have an account?{" "}
                      <span className="text-blue-500 font-semibold">
                        <Link to="/register"> Sign Up</Link>
                      </span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </form>
          </Form>
        </main>
      </div>
    </section>
  );
}
