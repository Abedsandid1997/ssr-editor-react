import Link from "next/link";
import React from "react";
import { FiEdit } from "react-icons/fi";
const EditButton = ({ id }: { id: string }) => {
  return (
    <Link href={`/edit/${id}`}>
      <FiEdit
        size="1.5rem"
        className="text-green-400 cursor-pointer transition-all duration-150  hover:text-green-600 hover:scale-105"
      />
    </Link>
  );
};

export default EditButton;
