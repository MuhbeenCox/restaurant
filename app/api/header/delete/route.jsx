import { NextResponse } from "next/server";

export const DELETE = async (req) => {
  try {
    const { _id } = await req.json();
    console.log(_id);
    return NextResponse.json(true);
  } catch (error) {}
};
