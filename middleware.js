import { NextResponse } from "next/server";

// import { getServerSession } from "next-auth";
// import { authOptions } from "@app/api/auth/[...nextauth]/route";

export async function middleware(request) {
  try {
    console.log("midle ware executed");
     const authToken = request.cookies.get("next-auth.session-token");

     const url = request.nextUrl.pathname;

    const loginUserNotAccessPath =
      url === "/sign-up" ||
      url === "/sign-in";

      const withoutLoginNotAccessPath = [
        "/cart",
        "/check_out",
        "/wishlist",
        "/order",
        "/profile",
      ].includes(url);
      const isAdminRoute = request.nextUrl.pathname.startsWith("/dashboard");

      if (withoutLoginNotAccessPath && !authToken) {
        return NextResponse.redirect(new URL("/", request.url));
      }

      if (loginUserNotAccessPath && authToken) {
        return NextResponse.redirect(new URL("/", request.url));
      }

    if (isAdminRoute && !authToken) {
      // Assuming you have a function isAdmin() to check if the user is admin
     
        return NextResponse.redirect(new URL("/", request.url));
      
    }


// if (isAdminRoute) {
//   const session = await getServerSession({ req: request, ...authOptions });
//   if (!session) {
//     return NextResponse.redirect(new URL("/sign-in", request.url));
//   }

//   const userEmail = session?.user?.email;
//   const userIsAdmin = await isAdmin(userEmail);
//   if (!userIsAdmin) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }
// }


   
    return NextResponse.next();
  } catch (error) {
    console.error("Error in middleware:", error);

    // Handle the error gracefully, such as redirecting to an error page
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export const config = {
  matcher: ["/sign-up", "/sign-in", "/cart", "/check_out", "/profile", "/menu", "/order", "/wishlist", "/dashboard/:path*"],
};