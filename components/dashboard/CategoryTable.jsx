"use client";

import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@components/ui/button";
import { addData, deleteData, getData, updateData } from "@app/services";
import DataTable from "react-data-table-component";
import { ClipLoader, PuffLoader } from "react-spinners";
import { Edit, Ellipsis, PlusCircle, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { userProfile } from "@app/customHooks/userProfile";
import Link from "next/link";
import Image from "next/image";
import Loading from "@components/Loading";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const CategoryTable = ({ data }) => {
  const [search, setSearch] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const columns = [
    {
      name: "Category Name",
      selector: (row) => (
        <label className="md:text-lg text-neutral-500 capitalize">
          {row.name}
        </label>
      ),
    },
    {
      name: "Slug",
      selector: (row) => (
        <label className="md:text-lg text-neutral-500 capitalize">
          {row.slug}
        </label>
      ),
    },
    {
      name: "Image",
      selector: (row) => (
        <div>
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
      selector: (row) => <label className="text-md">h</label>,
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
              <DropdownMenuItem className="flex text-md items-center justify-between">
                Edit <Edit size={15} color="green" />
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              className="flex text-md items-center justify-between"
              onClick={() => {
                setDeleteDialogOpen(true);
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
        fontSize: "17px",
        fontWeight: "bold",
      },
    },
  };

  //   consth> {
  //     const date = new Date(timestamp);
  //     return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  //   };

  const handleDeleteCategory = async () => {
    try {
      const id = categoryToDelete._id;
      const res = await deleteData("category", id);
      if (res.success) {
        toast.success("Category deleted successfully");
        await getCategories();
      } else {
        toast.error("Failed to delete category");
      }
    } catch (error) {
      toast.error("An error occurred");
      console.error(error);
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  return (
    <div>
      <div className="max-w-4xl mx-auto">
        <div className="flex md:justify-between items-center">
          <div className="flex items-center">
            <input
              type="text"
              name="search"
              value={search}
              className="w-full"
              style={{ margin: 0, padding: "0px 10px" }}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
            />
          </div>
          <div className="w-full flex justify-end">
            <Link
              href="/dashboard/categories/create"
              className="bg-green-400 text-white px-4 py-2 rounded-md items-center hover:bg-green-500 flex gap-x-2"
            >
              <PlusCircle size={17} /> Create
            </Link>
          </div>
        </div>

        <div className="mt-8 padding-b">
          <DataTable
            title={
              <h3 className="text-neutral-500 text-sm font-semibold">
                Category List ({data?.length})
              </h3>
            }
            columns={columns}
            data={data}
            highlightOnHover
            pagination
            customStyles={customStyles}
            subHeader
            subHeaderAlign="right"
          />
        </div>
      </div>
      {deleteDialogOpen && (
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                category.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setDeleteDialogOpen(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteCategory}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default CategoryTable;
