import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { signOut } from "next-auth/react";

const MyAccounts = ({ profile, userData }) => {
  const orders = `${process.env.NEXT_PUBLIC_API_URL}/${
    userData?.admin ? "dashboard/orders" : "order"
  } `;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={`${profile}`} />
          <AvatarFallback className="capitalize">
            {userData?.name?.charAt()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {userData?.admin && (
          <>
            <Link href={`${process.env.NEXT_PUBLIC_API_URL}/dashboard`}>
              <DropdownMenuItem>Dashboard</DropdownMenuItem>
            </Link>
          </>
        )}
        <Link href={`${process.env.NEXT_PUBLIC_API_URL}/profile`}>
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </Link>

        <Link href={orders}>
          <DropdownMenuItem>Orders</DropdownMenuItem>
        </Link>
        <Link href={`${process.env.NEXT_PUBLIC_API_URL}/wishlist`}>
          <DropdownMenuItem>Wishlist</DropdownMenuItem>
        </Link>
        <DropdownMenuItem
          onClick={() =>
            signOut({
              callbackUrl: "/",
            })
          }
        >
          SignOut
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MyAccounts;
