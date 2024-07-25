import { Outfit } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "react-hot-toast";
import { Provider } from "@app/contextProvider/Provider";

const outfit = Outfit({ subsets: ["latin"] });
export const metadata = {
  title: "Top Taste",
  description: "Have food & share love ",
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className={cn("bg-background antialiased", outfit.className)}>
        <img
          src="/assets/hero.svg"
          className="absolute top-0 right-0 w-full md:w-[60%] -z-10"
          alt="hero-img"
        ></img>
        <div className="max-container  h-full ">
          <Provider>{children}</Provider>
          <Toaster></Toaster>
        </div>
      </body>
    </html>
  );
}
