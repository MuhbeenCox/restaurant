"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ClipLoader, FadeLoader, HashLoader } from "react-spinners";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const url = process.env.PUBLIC_URL;
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/register`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res, "check status");
      if (res.data.success) {
        toast.success(res.data.message);
        return router.push("/sign-in");
      } else {
        toast.error(res.data.message);
      }
      console.log(res.data.message, "check new response");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full px-7 h-full max-container  flex justify-center items-center ">
      <div className="rounded-md w-[400px] bg-white/95 px-8 py-8 shadow-lg flex flex-col items-center">
        <h2 className="text-center font-bold">Create Your account</h2>

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
          <div className="flex flex-col">
            <label className="mb-2">username</label>
            <input
              {...register("username", { required: "username is required" })}
              defaultValue=""
              type="text"
              name="username"
              className="outline-none bg-transparent px-3 rounded-md border h-10"
            />
            {errors.username && (
              <span className="text-red-500">{errors.username.message}</span>
            )}
          </div>
          <div className="flex  flex-col">
            <label className="mb-2">email</label>
            <input
              {...register("email", { required: "email is required" })}
              defaultValue=""
              type="email"
              name="email"
              className="outline-none bg-transparent px-3 rounded-md border h-10"
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>
          <div className="flex  flex-col relative ">
            <label className="mb-2">password</label>
            <input
              defaultValue=""
              {...register("password", {
                required: "password is required",
                validate: (value) => {
                  if (
                    value.length < 5 ||
                    !value.match(/.*[!@#$%^&*(),.?":{}|<>]/)
                  ) {
                    return "Password must be at least 5 characters long and contain at least one special character";
                  }
                },
              })}
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
            {errors.password && (
              <span className="text-red-500 ">{errors.password.message}</span>
            )}
          </div>
          <div className="mt-2 w-full ">
            <Button
              disabled={loading}
              type="submit"
              className="w-full cursor-pointer text-lg"
            >
              {loading ? (
                <div className="flex items-center gap-x-4">
                  Sign Up <ClipLoader size={20} color="#ffff" />
                </div>
              ) : (
                "Sign Up"
              )}
            </Button>
          </div>
        </form>

        <p className="text-sm text-center font-sans text-softtext mt-2">
          if you have aleady account?{" "}
          <Link href="/sign-in" className="text-blue-500 cursor-pointer">
            {" "}
            Sign-in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
