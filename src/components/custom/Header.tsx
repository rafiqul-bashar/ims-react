import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { BellIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAuthStore } from "@/store/authStore";

export default function Header() {
  const { LOGOUT_USER, USERDATA } = useAuthStore((state) => state);

  return (
    <header className=" bg-white py-8">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 ">
        <div className="sm:flex sm:items-center sm:justify-between ">
          <div className="text-center sm:text-left  w-full ">
            <h2 className="text-2xl font-semibold text-gray-900 sm:text-2xl">
              Welcome <span className="italic">{USERDATA?.name} !</span>
            </h2>
            <p className="mt-1.5 text-sm md:text-lg text-gray-500">
              Manage your stores, products and all! 🎉
            </p>
          </div>
          <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4 py-4 sm:py-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <BellIcon />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Notificatons</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="bg-red-400">
                  <p>Notification 1</p>
                  <p>Notification 1</p>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <Avatar>
                    <AvatarImage
                      src={
                        USERDATA?.image
                          ? USERDATA?.image
                          : "https://github.com/shadcn.png"
                      }
                      alt="@shadcn"
                    />
                    <AvatarFallback>userName</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={LOGOUT_USER}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
