"use client";
import axios from "axios";
import { ReadMoreRounded } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import { usePaging } from "../Components/PagingView";
import ListPage from "../Components/ListPage"

function Channels() {
  const [newChannelsSubmitted, setNewChannelsSubmitted] = useState(false);
  const [channelsData, setChannelsData] = useState([]);

  useEffect(() => {
    setNewChannelsSubmitted(false);
    axios
      .get("/channels", { withCredentials: true })
      .then((res) => {
        if (res.data != null) {
          setChannelsData(res.data.channels);
        }
      });
  }, [newChannelsSubmitted]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?"))
      axios
        .post("/delete_channel", { channelId: id }, { withCredentials: true })
        .then((res) => {
          if (res.data === "success") {
            setNewChannelsSubmitted(true);
          } else {
            console.log(res.data);
          }
        });
  };
  

  const ChannelsTable = () => {
    const {PagingView,computedData} = usePaging(channelsData);
     

    return (
      <>
        {" "}
        <PagingView/>
        <table>
          <thead>
            <tr>
              <th>Channel Id</th>
              <th>Channel Title</th>
              <th>Thumbnail</th>
              <th>Position</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {computedData.map((channel, i) => {
              return (
                <tr key={i}>
                  <td>
                    <p className="maincolor">#</p>
                    {channel.id}
                  </td>
                  <td>{channel.title}</td>
                  <td>
                    <img src={channel.thumbnail} alt="" className="w-10" />
                  </td>
                  <td>{channel.position}</td>
                  <td>{channel.published === 1 ? "🟢" : "🔴"}</td>
                  <td>
                    <Link href={`/channels/${channel.id}`}>
                      <ReadMoreRounded />
                    </Link>
                    <IconButton onClick={() => handleDelete(channel.id)}>
                      <DeleteIcon />
                    </IconButton>
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
   <ListPage
   path="/channels/new">
     <ChannelsTable/>
   </ListPage>
  );
}
export default Channels;
