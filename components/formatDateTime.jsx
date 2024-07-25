"use client";
export const formatDateTime = (createdAt) => {
  const date = new Date(createdAt);
  return `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`;
};
