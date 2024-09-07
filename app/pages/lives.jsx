"use client";
import axios from "axios";
import { AddCircleOutlineRounded, ReadMoreRounded } from "@mui/icons-material";
import Pagination from "../Components/Pagination";
import DeleteIcon from '@mui/icons-material/Delete';
import Link from 'next/link'
import React, { useEffect, useState }  from 'react';
import { IconButton } from "@mui/material";

function Lives(){
    
   const navigate = useNavigate()
    const [newLivesSubmitted,setNewLivesSubmitted] = useState(false);
    const [livesData,setLivesData] = useState([]);

    useEffect(()=>{
        setNewLivesSubmitted(false);
        axios
        .get("/lives",{withCredentials:true})
        .then((res)=>{
           if(res.data!=null){
           setLivesData(res.data)
           }
        })
    },[newLivesSubmitted])

    const handleDelete=(id)=>{
        if(window.confirm("Are you sure?"))
        axios
        .post("delete_live",{liveId:id},{withCredentials:true})
        .then((res)=>{
            if(res.data==="success") {
                setNewLivesSubmitted(true)
            }
        })

    }


    const LivesTable= () => {
        const [currentPage, setCurrentPage] =useState(1)
        const itemsPerPage =30;
        const totalLives = livesData.length;
        const computedLives = livesData.slice(
            (currentPage - 1) * itemsPerPage,
            (currentPage - 1) * itemsPerPage + itemsPerPage
          );
        const computedLivesLength =computedLives.length;
        return (
          <>
          {" "}
          <div className="tableResultWrap">
            {" "}
            <div className="resultsSpan">
               Showing 
               <font className="resultsBold"> {computedLivesLength} </font>
               of 
               <font className="resultsBold"> {totalLives} </font>
               results
            </div>
            <Pagination
                total= {totalLives}
                itemsPerPage = {itemsPerPage}
                currentPage = {currentPage}
                onPageChange = {(page)=> setCurrentPage(page)}
            />
          </div>
          <table>
            <thead>
                <tr>
                    <th>Live Id</th>
                    <th>Team Name</th>
                    <th>Opnent Name</th>
                    <th>Status</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
              {computedLives.map((live,i)=>{
               
                return (
                    <tr key={i}>
                        <td>
                            <font className="maincolor">#</font>
                            {live.id}
                            </td>
                            <td>{live.team_a_name}</td>
                            <td>{live.team_b_name}</td>
                            <td>{live.published===1 ?'🟢':'🔴'}</td>
                            <td>
                            <Link href={`/lives/${live.id}`}>
                            <ReadMoreRounded/>
                            </Link>
                            <IconButton
                            onClick={()=>handleDelete(live.id)}>
                                <DeleteIcon/>
                            </IconButton>
                            
                            </td>
                    </tr>
                )
              })}
            </tbody>
          </table>

          </>
        )

    }


    return (
    <div className="bodyWrap">
        <div className="contentOrderWrap clientsTableWrap">
            <div className="leftSide">
                <h1>Lives</h1>
                <div className="orderNavWrap">
                    <div className="addOrderWrap">
                        <button
                        className="addOrder"
                        onClick={()=>{
                        navigate(`/lives/new`)
                        }}>
                            <AddCircleOutlineRounded/>
                            <span className="addOrderText">Add</span>

                        </button>
                    </div>
                </div>
                <div className="orderWrap">
                    <LivesTable/>
                </div>
            </div>
        </div>
    </div>);
}
export default Lives;