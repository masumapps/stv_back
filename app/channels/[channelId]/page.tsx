"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Select, SelectItem } from "@nextui-org/select";
import { TextField, Switch, IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import LinkComponents from "../../Components/LinkComponents";
import { useParams, useRouter } from "next/navigation";
import { ImagePreview } from "../../Components/Image";
function ChannelPage() {
  const router = useRouter();
  const { channelId } = useParams();
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
  {
    console.log(channelData.channel.category_id)
  }

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
          router.back();
        } else {
          console.log(res.data);
        }
      });
  };
  const updateLink = (link) => {
    let array = channelData.links;
    const newList = array.filter((item) => item.id !== link.id);
    newList.push(link);

    if (link.id !== -1) {
      setChannelData({
        ...channelData,
        links: newList,
      });
      link.id &&
        setDeletedLinks({
          ...deletedLinks,
          ids: [...deletedLinks.ids, link.id],
        });
    }
  };
  const [value, setValue] = React.useState("");
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

  
  const animals = [
    { key: "cat", label: "Cat" },
    { key: "dog", label: "Dog" },
    { key: "elephant", label: "Elephant" },
    { key: "lion", label: "Lion" },
    { key: "tiger", label: "Tiger" },
    { key: "giraffe", label: "Giraffe" },
    { key: "dolphin", label: "Dolphin" },
    { key: "penguin", label: "Penguin" },
    { key: "zebra", label: "Zebra" },
    { key: "shark", label: "Shark" },
    { key: "whale", label: "Whale" },
    { key: "otter", label: "Otter" },
    { key: "crocodile", label: "Crocodile" },
  ];

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
                        position: Number(e.target.value),
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
                  className="w-1/2"
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

                <ImagePreview src={channelData.channel.thumbnail} />
              </div>
              <div className="r">
                <Select
                  label="Category"
                  variant="bordered"
                  labelPlacement="outside"
                  selectedKeys={[(channelData.channel.category_id).toString()]}
                  className="max-w-xs"
                  onChange={(e)=>{
                    console.log(e.target.value)

                    
                    setChannelData({
                      ...channelData,
                      channel: {
                        ...channelData.channel,
                        category_id: e.target.value,
                        category_title: "TODO",
                      },
                    });
                  }}
                >
                  {channelData.categories.map((category) => (
                    <SelectItem key={category.id}>{category.title}</SelectItem>
                  ))}
                </Select>

              
              </div>

              <div className="flex space-x-6 items-center">
                <div className="flex items-center">
                  <p>Published</p>
                  <Switch
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
                onRemoveLink={(id) => removeLink(id)}
                onUpdateLink={(link) => updateLink(link)}
                onSave={() => saveChannelChanges()}
              />
            </Box>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChannelPage;
