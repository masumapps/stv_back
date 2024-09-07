"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { TextField, Button, Switch, IconButton, Snackbar } from "@mui/material";
function NotificationPage() {

  
  const [open, setOpen] = React.useState(false);
  const initialNotificationData={
    title: "",
    description: "",
    image: "",
    link: "",
  }

  const [notificationData, setNotificationData] = useState(
    initialNotificationData
  );

  const saveCategoryChanges = () => {
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
          setOpen(true)
          setNotificationData(initialNotificationData)

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
