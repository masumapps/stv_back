"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Select from "react-select";
import {
  TextField,
  Switch,
  IconButton,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import LinkComponents from "../../Components/LinkComponents";
import { useRouter } from "next/navigation";
function ChannelPage({ params }) {
  const router= useRouter()
  const channelId = params.channelId;
  const initialChannel = {
    id: -1,
    title: "",
    category_id: -1,
    channel_title: "",
    position: 1,
    published: true,
    thumbnail: "",
  };
  const [channelData, setChannelData] = useState({
    channel: initialChannel,
    links: [],
    categories: [],
  });
  const [deletedLinks, setDeletedLinks] = useState({ ids: [] });

  useEffect(() => {
    axios
      .get(`/channel_by_id?id=${channelId}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data != null) {
          setChannelData({
            channel: res.data[0] || initialChannel,
            links: res.data[1],
            categories: res.data[2],
          });
        }
      });
  }, [channelId]);

  const saveChannelChanges = () => {
    const action = channelId === "new" ? "add_channel" : "update_channel";
    axios
      .post(
        `/${action}`,
        {
          channelData: channelData,
          deletedIds: deletedLinks,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data === "success") {
          router.back()
        } else {
          console.log(res.data);
        }
      });
  };

  const removeLink = (id) => {
    let array = channelData.links;
    const newList = array.filter((item) => item.id !== id);

    if (id !== -1) {
      setChannelData({
        ...channelData,
        links: newList,
      });
      id &&
        setDeletedLinks({
          ...deletedLinks,
          ids: [...deletedLinks.ids, id],
        });
    }
  };

  return (
    <>
      <div className="ml-80  flex flex-col relative">
        <div className="w-full h-full pt-10 pl-10">
          <div className="flex items-center">
            <IconButton onClick={() => router.back()}>
              <ArrowBack />
            </IconButton>
            <div>
              {" "}
              {channelId === "new" ? (
                <h3 className="font-bold pb-5">Add Channel</h3>
              ) : (
                <h3 className="font-bold pb-5">
                  Edit Channel
                  <p className="maincolor bold">#{channelId}</p>
                </h3>
              )}
            </div>
          </div>
          <div className="inputGroup">
            <Box className="space-y-5" component="form">
              <div className="flex space-x-2 items-center">
                <TextField
                  label="Title"
                  value={channelData.channel ? channelData.channel.title : ""}
                  onChange={(e) =>
                    setChannelData({
                      ...channelData,
                      channel: {
                        ...channelData.channel,
                        title: e.target.value,
                      },
                    })
                  }
                />

                <TextField
                  id="outlined-number"
                  label="Channel Position"
                  type="number"
                  value={
                    channelData?.channel ? channelData.channel.position : 1
                  }
                  onChange={(e) =>
                    setChannelData({
                      ...channelData,
                      channel: {
                        ...channelData.channel,
                        position: e.target.value,
                      },
                    })
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>

              <div className="flex space-x-2 items-center">
                <TextField
                  label="Thumbnail"
                  value={
                    channelData.channel ? channelData.channel.thumbnail : ""
                  }
                  onChange={(e) =>
                    setChannelData({
                      ...channelData,
                      channel: {
                        ...channelData.channel,
                        thumbnail: e.target.value,
                      },
                    })
                  }
                />
                <img
                  className="h-10"
                  src={channelData.channel ? channelData.channel.thumbnail : ""}
                />
              </div>
              <div className="flex space-x-6 items-center">
                <p>Category</p>

                <Select
                  value={{
                    label: channelData?.channel?.category_title,
                    value: channelData?.categories
                      ? channelData.category_id
                      : -1,
                  }}
                  onChange={(e) => {
                    console.log(e);

                    setChannelData({
                      ...channelData,
                      channel: {
                        ...channelData.channel,
                        category_id: e.value,
                        category_title: e.label,
                      },
                    });
                  }}
                  options={
                    channelData?.categories
                      ? channelData.categories.map((category) => ({
                          label: category.title,
                          value: category.id,
                        }))
                      : []
                  }
                />
              </div>

              <div className="flex space-x-6 items-center">
                <div className="flex items-center">
                  <p>Published</p>
                  <Switch
                    label="Published"
                    checked={
                      channelData?.channel
                        ? channelData.channel.published
                        : false
                    }
                    onChange={(event) => {
                      setChannelData({
                        ...channelData,
                        channel: {
                          ...channelData.channel,
                          published: event.target.checked,
                        },
                      });
                    }}
                  />
                </div>
              </div>

              <LinkComponents
                data={channelData}
                onAddLink={(link) =>
                  setChannelData({
                    ...channelData,
                    links: [...channelData.links, link],
                  })
                }
                onRemoveLink={(id)=>removeLink(id)}
                onSave={()=>saveChannelChanges()}
              />
            </Box>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChannelPage;
