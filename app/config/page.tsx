"use client";
import axios from "axios";
import { AddCircleOutlineRounded, ReadMoreRounded } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState } from "react";
import Popup from "../Components/Popup";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";

import { usePaging } from "../Components/PagingView";
import { getConfig } from "../api/LiveData";

function Config() {
  const [configData, setConfigData] = useState([]);
  const [configsUpdated, setConfigUpdated] = useState(false);
  
  const [popup, setPopup] = useState({
    show: false,
    id: null,
  });
  
  const [newConfigPopup, setNewConfigPopup] = useState(false);

  const [settingDetails, setSettingDetails] = useState({
    id: -1,
    name: "",
    value: "",
  });
  

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
                      <ReadMoreRounded
                        onClick={() => {
                          setSettingDetails({
                             id: category.id,
                            name: category.name,
                           value: category.value,
                          });
                           setNewConfigPopup(true);
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

  const UpdateSettingPopup = () => {
    const [settingDetails, setSettingDetails] = useState({
      id: -1,
      name: "",
      value: "",
    });
    
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
            setConfigUpdated(true);
            setNewConfigPopup(false);
          }
        });
    };
    return (
      <Popup trigger={newConfigPopup} setTrigger={setNewConfigPopup}>
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

  
  const AddNewSettingPopup = (props) => {
    
  const { id, name, value } = props;
    
    const [settingDetails, setSettingDetails] = useState({
      id: id,
      name: name,
      value: value,
    });
    
    const addNewUser = () => {
      axios
        .post(
         id === -1 ? "/newsetting" : "/update_setting",
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
            setConfigUpdated(true);
            setNewConfigPopup(false);
          }
        });
    };
    return (
      <Popup trigger={newConfigPopup} setTrigger={setNewConfigPopup}>
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
                <span className="addOrderText">{ id === -1 ? "Add" : "Update"}</span>
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
                  setSettingDetails(
                    {
                      id: -1,
                      name: "",
                      value: "",
                    }
                  )
                  setNewConfigPopup(true);
                }}
              >
                <AddCircleOutlineRounded />
                <span className="addOrderText">Add</span>
              </button>
            </div>
          </div>
          <div className="orderWrap">
            <AddNewSettingPopup 
            id ={settingDetails.id}
            name={settingDetails.name}
            value={settingDetails.value}
            />
       
            <ConfigTable />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Config;
