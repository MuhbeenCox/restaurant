"use client";
import { deleteData, getData } from "@app/services";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, Ellipsis, PlusCircle, Trash } from "lucide-react";
import { userProfile } from "@app/customHooks/userProfile";
import Link from "next/link";
import Image from "next/image";
import Loading from "@components/Loading";
import DeleteDialog from "@components/dashboard/DeleteDialog";
import Box from "@components/Box";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState([]);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [deleteDialougeOpen, setDeleteDialougeOpen] = useState(false);

  const { pageLoading, userData } = userProfile();

  const getCategories = async () => {
    try {
      const res = await getData("category");
      setCategories(res.data);
      setFilterCategory(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      const id = categoryToDelete._id;

      const res = await deleteData("category", id);
      console.log(res, "delete result 1122 ");
      if (res.success) {
        await getCategories();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      name: "Category Name",
      selector: (row) => (
        <label className="md:text-lg text-neutral-500 capitalize">
          {" "}
          {row.name}
        </label>
      ),
    },

    {
      name: "Slug",
      selector: (row) => (
        <label className=" md:text-lg text-neutral-500 capitalize">
          {" "}
          {row.slug}
        </label>
      ),
    },
    {
      name: "Image",
      selector: (row) => (
        <div className="">
          <Image
            src={row.image}
            width={70}
            height={70}
            className="object-contain"
            alt="product"
          />
        </div>
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
          <DropdownMenuContent>
            <Link href={`/dashboard/categories/edit/${row._id}`}>
              {" "}
              <DropdownMenuItem className="flex text-md items-center justify-between">
                Edit <Edit size={15} color="green" />
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              className="flex text-md items-center justify-between"
              onClick={() => {
                setDeleteDialougeOpen(true);
                setCategoryToDelete(row);
              }}
            >
              Delete <Trash size={15} color="red" />
            </DropdownMenuItem>
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

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    const result = categories.filter((category) =>
      category.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilterCategory(result);
  }, [search, categories]);
  if (pageLoading) {
    return <Loading></Loading>;
  }
  if (!userData.admin) {
    return "you are not an Admin...";
  }

  return (
    <Box>
      <div className="max-w-4xl mx-auto ">
        <div className="flex    md:justify-between  items-center ">
          <div className="flex items-center ">
            <input
              type="text"
              name="search"
              value={search}
              className="w-full  "
              style={{ margin: 0, padding: "0px 10px" }}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search "
            />
          </div>
          <div className=" w-full  flex justify-end">
            <Link
              href="/dashboard/categories/create"
              className="bg-green-400 text-white px-4 py-2 rounded-md items-center hover:bg-green-500 flex gap-x-2 "
            >
              <PlusCircle size={17}></PlusCircle> Create{" "}
            </Link>
          </div>
        </div>

        <div className="mt-8 padding-b  ">
          <DataTable
            title={
              <h3 className="text-neutral-500 text-sm font-semibold">
                Category List ({categories.length})
              </h3>
            }
            columns={columns}
            data={filterCategory}
            highlightOnHover
            pagination
            customStyles={customStyles}
            subHeader
            subHeaderAlign="right"
            // subHeaderComponent={

            // }
          />
        </div>
      </div>
      {deleteDialougeOpen && (
        <DeleteDialog
          deleteDialougeOpen={deleteDialougeOpen}
          setDeleteDialougeOpen={setDeleteDialougeOpen}
          handleDelete={handleDeleteCategory}
          label={categoryToDelete?.name}
        ></DeleteDialog>
      )}
    </Box>
  );
};

export default CategoryPage;
