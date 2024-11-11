"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Styles/homepage.css";
import { Buffer } from "buffer";
import { Button } from "@mui/material";
import "./Styles/popup.css";
import {Progress} from "@nextui-org/progress";

//require("dotenv").config();

function Homepage() {
  const [logMessage, setLogMessage] = useState("");
  const [showProgress, setShowProgress] = useState(false);

  useEffect(() => {
    //  upload();
  }, []);

  const syncLiveData = () => {
    setShowProgress(true)
    axios.get("/lives", { withCredentials: true }).then((res) => {
      if (res.data != null) upload("lives.json", res.data);
    });
  };
  const syncChannelData = () => {
    setShowProgress(true)
    axios.get("/channels", { withCredentials: true }).then((res) => {
      if (res.data != null) upload("channels.json", res.data);
    });
  };

  const syncCategoryData = () => {
    setShowProgress(true)
    axios.get("/categories", { withCredentials: true }).then((res) => {
      if (res.data != null) upload("categories.json", res.data);
    });
  };

  const syncLinkData = () => {
    setShowProgress(true)
    axios.get("/links", { withCredentials: true }).then((res) => {
      if (res.data != null) upload("links.json", res.data);
    });
  };

  const syncConfigData = () => {
    setShowProgress(true)
    axios.get("/config", { withCredentials: true }).then((res) => {
      if (res.data != null)upload("config.json", res.data);
    });
  };

  async function upload(path, content) {
    const message = "pushed";
    const owner = process.env.OWNER;
    const repo = process.env.REPO;
    const auth = process.env.GITHUB_TOKEN;

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
            setShowProgress(false)
          });
      });
  }

  return (
      <div className="bodyWrap dashboardPage">
      <div className="flex flex-col space-y-3">
        {showProgress &&
        <Progress
        size="sm"
        isIndeterminate
        aria-label="Loading..."
        className="max-w-md"
      />}
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
