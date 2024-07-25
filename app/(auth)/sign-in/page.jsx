"use client";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const session = useSession();
  const router = useRouter();

  console.log(session, "check sessuion");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      setLoading(true);
      setError(null);
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.ok) {
        router.push("/");
        setLoading(false);
      } else if (!res.ok) {
        setError(res.error);
      }
      console.log(res, "check session staus");
    } catch (error) {
      console.log(error, "auth error messege food");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full py-10 h-full flex justify-center items-center ">
      <div className="rounded-md w-[400px] bg-white px-8 py-8 shadow-lg flex flex-col items-center">
        <h2 className="text-center font-bold">Sign-in Your account</h2>

        <div className="flex items-center gap-3 w-full mt-6">
          <Button variant="outline" className="w-full cursor-pointer">
            <Image
              src="/assets/auth/githubb.png"
              width={30}
              height={30}
              alt="github"
            ></Image>
            Github
          </Button>
          <Button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/" })}
            variant="outline"
            className="w-full cursor-pointer"
          >
            <Image
              src="/assets/auth/google.png"
              width={30}
              height={30}
              alt="google"
            ></Image>
            Google
          </Button>
        </div>
        <div className="flex items-center gap-x-3  w-full justify-center my-4">
          <div className="border border-neutral-100 w-full"></div>
          <span className="text-neutral-500 ">or</span>
          <div className="border  border-neutral-100 w-full"></div>{" "}
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" w-full flex-col flex gap-y-3"
        >
          <div className="flex gap-2 flex-col">
            <label>email</label>
            <input
              defaultValue=""
              {...register("email", { required: "email is required" })}
              type="email"
              name="email"
              className="outline-none bg-transparent px-3 rounded-md border h-10"
            />
          </div>
          <div className="flex gap-2 flex-col relative">
            <label>password</label>
            <input
              defaultValue=""
              {...register("password", { required: "password is required" })}
              type={showPassword ? "text" : "password"}
              name="password"
              className="outline-none bg-transparent px-3 rounded-md border h-10"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute  right-2 top-11 cursor-pointer z-10"
            >
              {showPassword ? (
                <EyeOff size={20} className="text-neutral-400" />
              ) : (
                <Eye size={20} className="text-neutral-400" />
              )}
            </span>
          </div>
          {error && <span className="text-red-500">{error}</span>}
          <div className="mt-2 w-full ">
            <Button
              disabled={loading}
              type="submit"
              className="w-full cursor-pointer text-lg"
            >
              {loading ? (
                <div className="flex items-center gap-x-4">
                  Sign in <ClipLoader size={20} color="#ffff" />
                </div>
              ) : (
                "Sign in"
              )}
            </Button>
          </div>
          <p className="text-sm text-center font-sans text-softtext">
            If you have not Account?
            <Link href="/sign-up" className="text-blue-500 cursor-pointer">
              {" "}
              Sign-up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signin;
