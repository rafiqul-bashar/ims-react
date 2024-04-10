import React from "react";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { GoalIcon } from "lucide-react";
export default function LoginPage() {
  return (
    <section className=" w-sceen h-screen grid content-center">
      <div className="max-w-3xl w-full mx-auto flex flex-col md:flex-row md:items-center md:justify-center ">
        <img
          alt=""
          src="/Logo.png"
          className="hidden md:block scale-75 mx-auto"
        />
        <main className="md:ml-auto">
          <Card className="mx-auto md:w-[30vw]  text-gray-800  border-0 rounded-none">
            <CardHeader className="space-y-2">
              <img alt="" src="/Logo.png" className="mx-auto my-4 w-16 h-20" />
              <CardTitle className="text-2xl font-semibold text-center">
                Log in to your account
              </CardTitle>
              <CardDescription className="text-center">
                Welcome back! Please enter your details.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="Enter your email"
                    required
                    type="email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    className=""
                    id="password"
                    required
                    type="password"
                    placeholder="*********"
                  />
                </div>
                <div className="flex items-center justify-between text-sm text-blue-600">
                  <Link to="#"> Forgot Password?</Link>
                </div>
                <Button className="w-full" type="submit">
                  Login
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
        </main>
      </div>
    </section>
  );
}
