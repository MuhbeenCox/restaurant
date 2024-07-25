import Link from "next/link";
import React from "react";

const DashboardCard = ({ label, length, link = "#" }) => {
  return (
    <Link
      href={link}
      className=" min-h-44 group rounded-md bg-no-repeat bg-cover  bg-footer_shape   flex flex-col border  gap-y-4 hover:shadow-xl bg-white-400 justify-center items-center"
    >
      <h2 className="text-xl flex-wrap text-softtext flex group-hover:scale-110 transition-all duration-500 font-semibold ">
        {label}
      </h2>
      <p className="text-lg  font-semibold group-hover:text-primary">
        {length}
      </p>
    </Link>
  );
};

export default DashboardCard;
