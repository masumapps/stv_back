"use client";
import axios from "axios";
import { AddCircleOutlineRounded, ReadMoreRounded } from "@mui/icons-material";
import Pagination from "../Components/Pagination";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";

import { usePaging } from "../Components/PagingView";
import ListPage from "../Components/ListPage";

function Lives() {
  const [newLivesSubmitted, setNewLivesSubmitted] = useState(false);
  const [livesData, setLivesData] = useState([]);

  useEffect(() => {
    setNewLivesSubmitted(false);
    axios
      .get("/lives", { withCredentials: true })
      .then((res) => {
        if (res.data != null) {
          setLivesData(res.data);
        }
      });
  }, [newLivesSubmitted]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?"))
      axios
        .post("delete_live", { liveId: id }, { withCredentials: true })
        .then((res) => {
          if (res.data === "success") {
            setNewLivesSubmitted(true);
          }
        });
  };

  const LivesTable = () => {
    const {PagingView,computedData} = usePaging(livesData);
     
    return (
      <>
        <PagingView/>
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
            {console.log(computedData)}
            {
              computedData.map((live, i) => {
                return (
                  <tr key={i}>
                    <td>
                      <span className="maincolor">#</span>
                      {live.id}
                    </td>
                    <td>{live.team_a_name}</td>
                    <td>{live.team_b_name}</td>
                    <td>{live.published === 1 ? "🟢" : "🔴"}</td>
                    <td>
                      <Link href={`/lives/${live.id}`}>
                        <ReadMoreRounded />
                      </Link>
                      <IconButton onClick={() => handleDelete(live.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </>
    );
  };

  return (
<ListPage
           path="/lives/new">
             <LivesTable />
           </ListPage>
    
  );
}
export default Lives;
