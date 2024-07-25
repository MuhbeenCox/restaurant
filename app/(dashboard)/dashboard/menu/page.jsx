"use client";
import { Button } from "@components/ui/button";
import React, { useEffect, useState } from "react";
import { Edit, Ellipsis, PlusCircleIcon, Trash2 } from "lucide-react";
import Link from "next/link";
import { deleteData, getData } from "@app/services";
import DataTable from "react-data-table-component";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { userProfile } from "@app/customHooks/userProfile";
import Loading from "@components/Loading";
import DeleteDialog from "@components/dashboard/DeleteDialog";
import Box from "@components/Box";

const MenuPage = () => {
  const [foodItem, setFoodItem] = useState();
  const [search, setSearch] = useState("");
  const [filterFood, setFilterFood] = useState();
  const [deleteDialougeOpen, setDeleteDialougeOpen] = useState(false);
  const [foodItemToDelete, setFoodItemToDelete] = useState(null);
  const { pageLoading, userData } = userProfile();

  const getFoodItems = async () => {
    try {
      const res = await getData("foodItem");

      setFoodItem(res.data);
      setFilterFood(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCategory = async () => {
    const id = foodItemToDelete._id;
    const res = await deleteData("foodItem", id);
    if (res.success) {
      getFoodItems();
    }
  };
  const customStyles = {
    headCells: {
      style: {
        fontSize: "17px", // Adjust the font size as needed
        fontWeight: "bold",
        display: "flex", // Use flexbox
        justifyContent: "center", // Center items horizontally
        alignItems: "center", // Center items vertically
      },
    },
  };

  const columns = [
    {
      name: "Image",
      selector: (row) => (
        <div className=" p-2">
          <div className="min-h-[100px] w-[100px] shadow-lg relative bg-white">
            <Image
              src={row.image}
              className="object-contain w-full h-full   absolute"
              fill
              alt="product"
            />
          </div>
        </div>
      ),
    },
    {
      name: "Food Name",
      selector: (row) => (
        <label className="text-lg text-neutral-500 capitalize  text-ellipsis">
          {" "}
          {row.name}
        </label>
      ),
    },
    {
      name: "Price",
      selector: (row) => (
        <label className="text-neutral-500 text-[17px] text-center  md:w-[140px] block">
          {row.basePrice}
        </label>
      ),
    },

    {
      name: "Category",
      selector: (row) => (
        <label className="text-lg  text-neutral-500 text-center  md:w-[140px] block">
          {row.category}
        </label>
      ),
    },
    {
      name: "Available",
      selector: (row) => (
        <label className="text-lg text-neutral-500 text-center  md:w-[100px] block">
          {row.available ? "Yes" : "No"}
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
        <div className=" w-full flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="ms-4 ">
              <Ellipsis size={20} color="gray" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Link href={`/dashboard/menu/edit/${row._id}`}>
                {" "}
                <DropdownMenuItem className="flex text-md items-center justify-between">
                  Edit <Edit size={15} color="green" />
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                className="flex text-md items-center justify-between"
                onClick={() => {
                  setDeleteDialougeOpen(true);
                  setFoodItemToDelete(row);
                }}
              >
                Delete <Trash2 size={15} color="red" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  const formatDateTime = (createdAt) => {
    const date = new Date(createdAt);
    return `${date.toLocaleDateString()}-${date.toLocaleTimeString()}`;
  };

  useEffect(() => {
    getFoodItems();
  }, []);

  useEffect(() => {
    const filterdata = foodItem?.filter((item) => {
      return (
        item.name.toLowerCase().match(search.toLowerCase()) ||
        item.category.toLowerCase().match(search.toLowerCase())
      );
    });
    setFilterFood(filterdata);
  }, [search, foodItem]);

  if (pageLoading) {
    return <Loading></Loading>;
  }
  if (!userData.admin) {
    return "you are not an Admin...";
  }

  return (
    <Box>
      <div className="w-full flex justify-end items-center">
        <Link href="/dashboard/menu/new">
          <Button variant="outline" className="gap-2">
            <PlusCircleIcon size={17}></PlusCircleIcon> Add New
          </Button>
        </Link>
      </div>

      <DataTable
        title={
          <h3 className="text-neutral-500 font-semibold">
            Products List ({foodItem?.length})
          </h3>
        }
        columns={columns}
        data={filterFood}
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
            placeholder="Search Food"
          />
        }
      />

      {deleteDialougeOpen && (
        <DeleteDialog
          handleDelete={handleDeleteCategory}
          deleteDialougeOpen={deleteDialougeOpen}
          setDeleteDialougeOpen={setDeleteDialougeOpen}
          label={foodItemToDelete?.name}
        ></DeleteDialog>
      )}
    </Box>
  );
};

export default MenuPage;
