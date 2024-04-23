import {
  BarChart,
  BarChart3,
  CircleUserRound,
  Home,
  Layers,
  ListOrdered,
  LogOut,
  LogOutIcon,
  ReceiptText,
  Settings,
  Settings2,
  ShoppingCart,
} from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";

const navLinks = [
  { path: "/", name: "Home", icon: <Home className="w-6  h-6" /> },
  {
    path: "/products",
    name: "Inventory",
    icon: <ShoppingCart className=" w-6  h-6" />,
  },
  {
    path: "/reports",
    name: "Reports",
    icon: <BarChart3 className=" w-6  h-6" />,
  },
  {
    path: "/suppliers",
    name: "Suppliers",
    icon: <CircleUserRound className=" w-6  h-6" />,
  },
  {
    path: "/orders",
    name: "Orders",
    icon: <ListOrdered className=" w-6  h-6" />,
  },
  {
    path: "/manage-store",
    name: "Manage Store",

    icon: <ReceiptText className=" w-6  h-6" />,
  },
];

export default function SideBar() {
  return (
    <aside className="sticky left-0 top-0 h-screen bg-blue-300 flex flex-col justify-between bg-white">
      <nav className=" flex-1 ">
        <p className="py-7 w-full bg-pink-300">Logo </p>
        <ul className="space-y-6 pt-4">
          {navLinks.map((link, index) => (
            <li key={index} className="">
              <NavLink
                className={({ isActive }) =>
                  ` flex items-center space-x-4 py-2 w-full px-6 md:px-12 ${
                    isActive ? "text-primary" : "text-gray-700"
                  }  hover:text-primary/90 `
                }
                to={link.path}
              >
                {link.icon}
                <span className="hidden sm:block text-sm">{link.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mb-12">

        <NavLink
          className={({ isActive }) =>
            `  flex items-center space-x-3 py-2 w-full px-6 md:px-12 ${
              isActive ? "text-primary" : "text-gray-700"
            }  hover:text-primary/90 `
          }
          to={"/settings"}
        >
          <Settings className="w-6 h-6" />
          <span className="hidden sm:block text-sm">Settings</span>
        </NavLink>
        <Button variant='ghost'
          className=
            '  flex items-center space-x-3 py-2 px-6 md:px-12 mt-2 text-gray-700
              hover:text-primary/90 '>

          <LogOutIcon className="w-6 h-6" />
          <span className="hidden sm:block text-sm">Log Out</span>
        </Button>


      </div>
    </aside>
  );
}
