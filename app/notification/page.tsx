"use client";
import axios from "axios";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import { TextField, Button, Snackbar, Switch } from "@mui/material";
import "./../Styles/popup.css";
import { Progress } from "@nextui-org/progress";
import { useReportWebVitals } from "next/web-vitals";
function NotificationPage() {
  useReportWebVitals((metric) => {
    console.log(metric);
  });
  const [open, setOpen] = React.useState(false);
  const initialNotificationData = {
    title: "",
    description: "",
    image: "",
    link: "",
    stv: true,
    krira: true,
  };

  const [notificationData, setNotificationData] = useState(
    initialNotificationData
  );
  const [showProgress, setShowProgress] = useState(false);

  const saveCategoryChanges = () => {
    setShowProgress(true);
    axios
      .post(
        "/send_notification",
        {
          notificationData: notificationData,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data === "success") {
          setOpen(true);
          setNotificationData(initialNotificationData);
          setShowProgress(false);
        } else {
          console.log(res.data);
        }
      });
  };

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={() => setOpen(false)}
        message="Push notification sent successfully"
      />
      <div className="bodyWrap ">
        <div className="contentOrderWrap w-full pt-20  pl-10">
          <div className="inputGroup">
            {showProgress && (
              <Progress
                size="sm"
                isIndeterminate
                aria-label="Loading..."
                className="max-w-md mb-2"
              />
            )}
            <Box className="flex flex-col space-y-5" component="form">
              <TextField
                required
                id="outlined-required"
                label="Title"
                value={notificationData.title}
                onChange={(e) =>
                  setNotificationData({
                    ...notificationData,
                    title: e.target.value,
                  })
                }
              />

              <TextField
                label="Description"
                value={notificationData.description}
                onChange={(e) =>
                  setNotificationData({
                    ...notificationData,
                    description: e.target.value,
                  })
                }
                style={{ width: 500 }}
              />

              <TextField
                label="Image"
                value={notificationData.image}
                onChange={(e) =>
                  setNotificationData({
                    ...notificationData,
                    image: e.target.value,
                  })
                }
                style={{ width: 500 }}
              />

              <TextField
                label="Link"
                value={notificationData.link}
                onChange={(e) =>
                  setNotificationData({
                    ...notificationData,
                    link: e.target.value,
                  })
                }
                style={{ width: 500 }}
              />

              <div className="flex items-center">
                <p>STV</p>
                <Switch
                  checked={notificationData.stv}
                  onChange={(event) => {
                    setNotificationData({
                      ...notificationData,
                      stv: event.target.checked,
                    });
                  }}
                />

                <p>Krira</p>
                <Switch
                  checked={notificationData.krira}
                  onChange={(event) => {
                    setNotificationData({
                      ...notificationData,
                      krira: event.target.checked,
                    });
                  }}
                />
              </div>

              <div className="w-96 grid justify-items-center">
                <Button
                  variant="contained"
                  onClick={() => saveCategoryChanges()}
                >
                  Send
                </Button>
              </div>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotificationPage;
