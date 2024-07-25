"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

const StatusSelect = ({ status, handleStatus }) => {
  return (
    <Select value={status} onValueChange={(value) => handleStatus(value)}>
      <SelectTrigger className="w-[100px]">
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="making">Making</SelectItem>
        <SelectItem value="on way">On Way</SelectItem>
        <SelectItem value="delivered">Delivered</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default StatusSelect;
