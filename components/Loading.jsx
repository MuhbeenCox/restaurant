import React from "react";
import { PuffLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="w-full h-screen flex justify-center bg-white items-center">
      <PuffLoader size={100} color="#FFBE00" />
    </div>
  );
};

export default Loading;
