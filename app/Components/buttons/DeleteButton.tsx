"use client"
import { IconButton } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";
import axios from "axios";

  const DeleteButton =({type,id}) =>{
  const router = useRouter();

    const handleDelete = async() => {
        if (window.confirm("Are you sure?"))
         await axios
            .post(`delete_${type}`, { id: id }, { withCredentials: true })
            router.refresh();
      };
    return (
       <div> 
       <IconButton onClick={handleDelete}>
         <DeleteIcon />
       </IconButton>
        </div>
    )
}

export default DeleteButton


