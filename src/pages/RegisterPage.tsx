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
export default function RegisterPage() {
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
                Create an account
              </CardTitle>
              <CardDescription className="text-center">
                Start your 30-day free trial.
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
                <p className="text-gray-600 text-sm ">
                  Must be at least 8 characters.{" "}
                </p>
                <Button className="w-full" type="submit">
                  Get Started
                </Button>
                <Button className="w-full" type="submit" variant="outline">
                  <GoalIcon className="mr-2" />
                  Sign In with Google
                </Button>
                <p className="text-gray-600 text-sm ">
                  Must be at least 8 characters.{" "}
                </p>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </section>
  );
}
