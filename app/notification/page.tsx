"use client";
import { useState } from "react";
import axios from "axios";
import { TextField, Button, Snackbar, Switch } from "@mui/material";
import { useRouter } from "next/router";

function NotificationPage() {
  const router = useRouter();
  const initialNotificationData ={
    title: "",
    description: "",
    image: "",
    link: "",
    stv: false,
  }
  const [notificationData, setNotificationData] = useState(initialNotificationData);

  const [open, setOpen] = useState(false);

  const saveCategoryChanges = async () => {
    try {
      const res = await axios.post(
        "/send_notification",
        {
          notificationData,
        },
        {
          withCredentials: true,
        }
      );

      if (res.data === "success") {
        setOpen(true);
        setNotificationData(initialNotificationData);
        router.push("/notification");
      } else {
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={() => setOpen(false)}
        message="Push notification sent successfully"
      />
      <div className="bodyWrap">
        <div className="contentOrderWrap w-full pt-20 pl-10">
          <div className="inputGroup">
            <form onSubmit={(e) => {
              e.preventDefault();
              saveCategoryChanges();
            }}>
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
                  label="STV"
                  checked={notificationData.stv}
                  onChange={(event) => {
                    setNotificationData({
                      ...notificationData,
                      stv: event.target.checked,
                    });
                  }}
                />
              </div>

              <div className="w-96 grid justify-items-center">
                <Button
                  variant="contained"
                  type="submit"
                >
                  Send
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotificationPage;

