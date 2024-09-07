import { AddCircleOutlineRounded } from "@mui/icons-material"
import { useRouter } from "next/navigation";

 const AddButton= ({path})=>{
  const router = useRouter()
return(
    <div className="orderNavWrap">
    <div className="addOrderWrap">
      <button
        className="addOrder"
        onClick={() => {
            router.push(path);
        }}
      >
        <AddCircleOutlineRounded />
        <span className="addOrderText">Add</span>
      </button>
    </div>
  </div>
)
}

export default AddButton