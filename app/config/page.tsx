"use client";
import axios from "axios";
import { AddCircleOutlineRounded, ReadMoreRounded } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState } from "react";
import Popup from "../Components/Popup";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";

import { usePaging } from "../Components/PagingView";
import { getConfig } from "../api/LiveData";
import Link from "next/link";

function Config() {

  const [newConfigSubmitted, setNewConfigSubmitted] = useState(false);
  const [configData, setConfigData] = useState([]);
  const [configsUpdated, setConfigUpdated] = useState(false);
  
  const [popup, setPopup] = useState({
    show: false,
    id: null,
  });
  
  const [newConfigPopup, setNewConfigPopup] = useState(false);



  useEffect(() => {
    setConfigUpdated(false);
    getConfig().then((res) => {
      setConfigData(res);
    })  
  
  }, [configsUpdated]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?"))
      axios
        .post("delete_setting", { configId: id }, { withCredentials: true })
        .then((res) => {
          if (res.data === "success") {
            setConfigUpdated(true);
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
