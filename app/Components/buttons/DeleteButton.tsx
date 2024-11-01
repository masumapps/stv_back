"use client"
import { IconButton } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";
import axios from "axios";
import { DeleteOutline } from "@mui/icons-material";
import { revalidatePath } from "next/cache";

  const DeleteButton =({type,id,page}) =>{
  const router = useRouter();

    const handleDelete = async() => {
        if (window.confirm("Are you sure?"))
         await axios
            .post(`delete_${type}`, { id: id }, { withCredentials: true })
            revalidatePath(`/${page}`,"page");
            router.refresh();
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


