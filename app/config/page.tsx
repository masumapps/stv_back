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
  const [newUserPopup, setNewUserPopup] = useState(false);

  const [newConfigSubmitted, setNewConfigSubmitted] = useState(false);
  const [configData, setConfigData] = useState([]);

  const [settingDetails, setSettingDetails] = useState({
    id: -1,
    name: "",
    value: "",
  });

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
                      <ReadMoreRounded
                        onClick={() => {
                          setSettingDetails({
                            id: category.id,
                            name: category.name,
                            value: category.value,
                          });
                          setNewUserPopup(true);
                        }}
                      />
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

  const AddNewSettingPopup = () => {
    const addNewUser = () => {
      axios
        .post(
          "/newsetting",
          {
            settingDetails: settingDetails,
          },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.data === "success") {
            setSettingDetails({
              id: -1,
              name: "",
              value: "",
            });
            setNewConfigSubmitted(true);
            setNewUserPopup(false);
          }
        });
    };
    return (
      <Popup trigger={newUserPopup} setTrigger={setNewUserPopup}>
        <div className="popupWrap bg-white z-10">
          <div className="productsSummary">
            <h3 className="productSummaryLeft">Add new Settings</h3>
          </div>

          <div className="addNewOrderWrap">
            <div className="addNewOrderForm">
              <div className="orderDetails">
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Name"
                    className="orderDetailsInput orderDetailsInputHalf"
                    value={settingDetails.name}
                    onChange={(e) =>
                      setSettingDetails({
                        ...settingDetails,
                        name: e.target.value,
                      })
                    }
                    required="required"
                  />
                  <input
                    type="text"
                    placeholder="Value"
                    className="orderDetailsInput orderDetailsInputHalf"
                    value={settingDetails.value}
                    onChange={(e) =>
                      setSettingDetails({
                        ...settingDetails,
                        value: e.target.value,
                      })
                    }
                    required="required"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="submitWrap">
            <div className="submitNewOrder">
              <button
                className="submitNewOrderBtn"
                onClick={() => addNewUser()}
              >
                <AddCircleOutlineRoundedIcon />
                <span className="addOrderText">Add</span>
              </button>
            </div>
          </div>
        </div>
      </Popup>
    );
  };

  return (
    <div className="bodyWrap">
      <div className="contentOrderWrap clientsTableWrap">
        <div className="leftSide">
          <div className="orderNavWrap">
            <div className="addOrderWrap">
              <button
                className="addOrder"
                onClick={() => {
                  setNewUserPopup(true);
                }}
              >
                <AddCircleOutlineRounded />
                <span className="addOrderText">Add</span>
              </button>
            </div>
          </div>
          <div className="orderWrap">
            <AddNewSettingPopup />
            <ConfigTable />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Config;
