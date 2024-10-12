"use client";
import axios from "axios";
import { AddCircleOutlineRounded, ReadMoreRounded } from "@mui/icons-material";
import Pagination from "../Components/Pagination";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import Popup from "../Components/Popup";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import Link from 'next/link'

import { usePaging } from "../Components/PagingView";

function Config() {

  const [newConfigSubmitted, setNewConfigSubmitted] = useState(false);
  const [configData, setConfigData] = useState([]);



  useEffect(() => {
    setNewConfigSubmitted(false);
    axios.get("/config", { withCredentials: true }).then((res) => {
      if (res.data != null) {
        setConfigData(res.data);
      }
    });
  }, [newConfigSubmitted]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?"))
      axios
        .post("delete_setting", { configId: id }, { withCredentials: true })
        .then((res) => {
          if (res.data === "success") {
            setNewConfigSubmitted(true);
          }
        });
  };

  const ConfigTable = () => {
    const {PagingView,computedData} = usePaging(configData);
     
    return (
      <>
        {" "}
        <PagingView/>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Value</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {computedData.map((category, i) => {
              return (
                <tr key={i}>
                  <td>
                    <p className="maincolor">#</p>
                    {category.id}
                  </td>
                  <td>{category.name}</td>
                  <td>{category.value}</td>
                  <td>
                    <div className="flex space-x-3">
                    <Link href={`/config/${category.id}`}>
                      <ReadMoreRounded
                      />
                      </Link>
                      <DeleteIcon onClick={() => handleDelete(category.id)} />
                    </div>
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
    <div className="bodyWrap">
      <div className="contentOrderWrap clientsTableWrap">
        <div className="leftSide">
          <div className="orderNavWrap">
            <div className="addOrderWrap">
              <Link href={"/config/new"}>
              <button
                className="addOrder"
              >
                <AddCircleOutlineRounded />
                <span className="addOrderText">Add</span>
              </button>
              </Link>
            </div>
          </div>
          <div className="orderWrap">
            <ConfigTable />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Config;
