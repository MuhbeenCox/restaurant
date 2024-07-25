"use client";
import { userProfile } from "@app/customHooks/userProfile";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getData } from "@app/services";
import { Edit, Ellipsis, Trash2 } from "lucide-react";
import Link from "next/link";
import Loading from "@components/Loading";
import Box from "@components/Box";
const UserPage = () => {
  const [users, setUsers] = useState(null);
  const [search, setSearch] = useState("");
  const [filterUser, setFilterUser] = useState(null);
  const { pageLoading, userData } = userProfile();

  const getUsers = async () => {
    const res = await getData("users");
    console.log(res.data, "check get all user data ");
    setUsers(res.data);
    setFilterUser(res.data);
  };

  const formatDateTime = (createdAt) => {
    const date = new Date(createdAt);
    return `${date.toLocaleTimeString()}/${date.toLocaleDateString()}`;
  };

  useEffect(() => {
    getUsers();
  }, []);
  useEffect(() => {
    const result = users?.filter((item) =>
      item.name.toLowerCase().match(search.toLowerCase())
    );
    setFilterUser(result);
  }, [search]);
  const columns = [
    {
      name: "User Name",
      selector: (row) => (
        <label className="text-lg text-neutral-500 "> {row.name}</label>
      ),
    },
    {
      name: "Email ",
      selector: (row) => (
        <label className="text-lg text-neutral-500">{row.email}</label>
      ),
    },
    {
      name: "Status",
      selector: (row) => (
        <label
          className={`${
            row.admin
              ? "text-green-500 font-bold px-2 rounded-md  bg-green-200"
              : " text-sky-500  px-2 rounded-md bg-sky-200 font-bold"
          } text-md `}
        >
          {row.admin ? "Admin" : "User"}
        </label>
      ),
    },
    {
      name: "Created At",
      selector: (row) => (
        <label className="text-md">{formatDateTime(row.createdAt)}</label>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <DropdownMenu>
          <DropdownMenuTrigger className="ms-4">
            <Ellipsis size={20} color="gray" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="max-w-52">
            <Link href={`/dashboard/users/${row._id}`}>
              {" "}
              <DropdownMenuItem className="flex text-md items-center  justify-between">
                Edit <Edit size={15} color="green" />
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        fontSize: "17px", // Adjust the font size as needed
        fontWeight: "bold",
      },
    },
  };

  if (pageLoading) {
    return <Loading></Loading>;
  }
  if (!userData.admin) {
    return "you are not an Admin...";
  }

  return (
    <Box>
      <div className="max-w-4xl mx-auto">
        <div>
          <DataTable
            title={
              <h3 className="text-softtext text-sm md:text-lg font-semibold">
                Users List ( {users?.length} )
              </h3>
            }
            columns={columns}
            data={filterUser}
            highlightOnHover
            pagination
            customStyles={customStyles}
            subHeader
            subHeaderAlign="right"
            subHeaderComponent={
              <input
                type="text"
                name="search"
                value={search}
                className="max-w-52"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search user"
              />
            }
          />
        </div>
      </div>
    </Box>
  );
};

export default UserPage;
