"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { TextField, Button, Switch, IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useParams, useRouter } from "next/navigation";

function CategoryPage() {
  const router = useRouter();
  const { configId } = useParams();
  const [categoryData, setCategoryData] = useState({
    id: -1,
    name: "",
    value: "",
    krira: "",
  });

  useEffect(() => {
    configId !== "-1" &&
      axios
        .get(`/config_by_id?id=${configId}`, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data != null) {
            setCategoryData(res.data);
          }
        });
  }, [configId]);

  const saveCategoryChanges = () => {
    const action = configId === "new" ? "newsetting" : "update_setting";
    axios
      .post(
        `/${action}`,
        {
          settingDetails: categoryData,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data === "success") {
          router.push("/config");
        } else {
          console.log(res.data);
        }
      });
  };

  return (
    <>
      <div className="relative ml-80 flex flex-col">
        <div className="h-full w-full pl-10 pt-10">
          <div className="">
            <IconButton onClick={() => router.back()}>
              <ArrowBack />
            </IconButton>
            <div>
              {" "}
              {configId === "new" ? (
                <h3 className="pb-5 font-bold">Add Config</h3>
              ) : (
                <h3 className="pb-5 font-bold">
                  Edit Config
                  <p className="maincolor bold">#{configId}</p>
                </h3>
              )}
            </div>
          </div>
          <div className="flex flex-col space-y-3">
              <TextField
                required
                className="w-1/2"
                id="outlined-required"
                label="Name"
                value={categoryData.name}
                onChange={(e) =>
                  setCategoryData({
                    ...categoryData,
                    name: e.target.value,
                  })
                }
              />
            <TextField
              label="Value"
              value={categoryData.value}
              onChange={(e) =>
                setCategoryData({
                  ...categoryData,
                  value: e.target.value,
                })
              }
              style={{ width: 500 }}
            />

            <TextField
              label="Krira"
              value={categoryData.krira}
              onChange={(e) =>
                setCategoryData({
                  ...categoryData,
                  krira: e.target.value,
                })
              }
              style={{ width: 500 }}
            />

            <div className="grid w-96 justify-items-center">
              <Button variant="contained" onClick={() => saveCategoryChanges()}>
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoryPage;
