"use client"
import { IconButton } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";
import axios from "axios";
import { DeleteOutline } from "@mui/icons-material";

  const DeleteButton =({type,id,page}) =>{
  const router = useRouter();

    const handleDelete = async() => {
        if (window.confirm("Are you sure?"))
         await axios
            .post(`delete_${type}`, { id: id }, { withCredentials: true })
            router.push(`/${page}`);
      };
    return (
       <div> 
       <IconButton onClick={handleDelete}>
         <DeleteOutline />
       </IconButton>
        </div>
    )
}

export default DeleteButton


