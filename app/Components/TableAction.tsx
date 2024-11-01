import { DeleteOutline, EditOutlined, EditRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Link from "next/link";
import DeleteButton from "./buttons/DeleteButton";

export const TableAction = ({ href,type,id,page }) => {
  return (
    <div className="flex">
      <Link href={href}>
        <IconButton>
          <EditOutlined />
        </IconButton>
      </Link>
      <DeleteButton type={type} id={id}page={page} />
    </div>
  );
};
