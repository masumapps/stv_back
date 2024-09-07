"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Styles/homepage.css";
import { AuthLoginInfo } from "../AuthComponents/AuthLogin";
import { Buffer } from "buffer";
import { Button } from "@mui/material";
//require("dotenv").config();

function Homepage() {
  const [dashboardData, setDashboardData] = useState({});
  const [logMessage, setLogMessage] = useState(process.env.REACT_APP_URL);

  useEffect(() => {
    //  upload();
  }, []);

  const syncLiveData = () => {
    axios.get("/lives", { withCredentials: true }).then((res) => {
      if (res.data != null) upload("lives.json", res.data);
    });
  };
  const syncChannelData = () => {
    axios.get("/channels", { withCredentials: true }).then((res) => {
      if (res.data != null) upload("channels.json", res.data);
    });
  };

  const syncCategoryData = () => {
    axios.get("/categories", { withCredentials: true }).then((res) => {
      if (res.data != null) upload("categories.json", res.data);
    });
  };

  const syncLinkData = () => {
    axios.get("/links", { withCredentials: true }).then((res) => {
      if (res.data != null) upload("links.json", res.data);
    });
  };

  const syncConfigData = () => {
    axios.get("/config", { withCredentials: true }).then((res) => {
      if (res.data != null)upload("config.json", res.data);
    });
  };

  async function upload(path, content) {
    const message = "pushed";
    const owner = "masumapps";
    const repo = "push_test";
    const auth = "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";

    axios
      .get(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${auth}`,
        },
      })
      .catch(() => {
        axios
          .put(
            `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
            {
              message,
              content: Buffer.from(JSON.stringify(content)).toString("base64"),
            },
            {
              headers: {
                Accept: "application/vnd.github+json",
                Authorization: `Bearer ${auth}`,
              },
            }
          )
          .then((res) => {
            console.log(res.data);
            setLogMessage(res.data.content.name);
          });
      })
      .then((res) => {
        axios
          .put(
            `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
            {
              message,
              content: Buffer.from(JSON.stringify(content)).toString("base64"),
              sha: res.data.sha,
            },
            {
              headers: {
                Accept: "application/vnd.github+json",
                Authorization: `Bearer ${auth}`,
              },
            }
          )
          .then((res) => {
            setLogMessage(res.data.content.name);
          });
      });
  }

  return (
    <div className="bodyWrap dashboardPage">
      <div className="flex flex-col space-y-3">
        <h1>Last Sync:{logMessage}</h1>
        <Button variant="contained" onClick={() => syncLiveData()}>
          Sync Lives
        </Button>

        <Button variant="contained" onClick={() => syncChannelData()}>
          Sync channels
        </Button>

        <Button variant="contained" onClick={() => syncCategoryData()}>
          Sync Categories
        </Button>

        <Button variant="contained" onClick={() => syncLinkData()}>
          Sync links
        </Button>

        <Button variant="contained" onClick={() => syncConfigData()}>
          Sync Config
        </Button>
      </div>
    </div>
  );
}

export default Homepage;
