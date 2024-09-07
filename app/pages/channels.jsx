"use client";
import axios from "axios";
import { AddCircleOutlineRounded, ReadMoreRounded } from "@mui/icons-material";
import Pagination from "../Components/Pagination";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from 'next/link'
import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import Image from "next/image";

function Channels() {
  const navigate = useNavigate();
  const [newChannelsSubmitted, setNewChannelsSubmitted] = useState(false);
  const [channelsData, setChannelsData] = useState([]);

  useEffect(() => {
    setNewChannelsSubmitted(false);
    axios.get("/channels", { withCredentials: true }).then((res) => {
      if (res.data != null) {
        setChannelsData(res.data);
      }
    });
  }, [newChannelsSubmitted]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?"))
      axios
        .post("delete_channel", { channelId: id }, { withCredentials: true })
        .then((res) => {
          if (res.data === "success") {
            setNewChannelsSubmitted(true);
          } else {
            console.log(res.data);
          }
        });
  };

  const ChannelsTable = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 30;
    const totalChannels = channelsData.length;
    const computedCateroies = channelsData.slice(
      (currentPage - 1) * itemsPerPage,
      (currentPage - 1) * itemsPerPage + itemsPerPage
    );
    const computedCategoryLength = computedCateroies.length;
    return (
      <>
        {" "}
        <div className="tableResultWrap">
          {" "}
          <div className="resultsSpan">
            Showing
            <font className="resultsBold"> {computedCategoryLength} </font>
            of
            <font className="resultsBold"> {totalChannels} </font>
            results
          </div>
          <Pagination
            total={totalChannels}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
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
            {computedCateroies.map((channel, i) => {
              return (
                <tr key={i}>
                  <td>
                    <font className="maincolor">#</font>
                    {channel.id}
                  </td>
                  <td>{channel.title}</td>
                  <td>
                    <Image src={channel.thumbnail} alt=""className="w-10" />
                  </td>
                  <td>{channel.position}</td>
                  <td>{channel.published === 1 ? "🟢" : "🔴"}</td>
                  <td>
                    <Link href={`/channel/${channel.id}`}>
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
    <div className="bodyWrap">
      <div className="contentOrderWrap clientsTableWrap">
        <div className="leftSide">
          <div className="orderNavWrap">
            <div className="addOrderWrap">
              <button
                className="addOrder"
                onClick={() => {
                  navigate(`/channel/new`);
                }}
              >
                <AddCircleOutlineRounded />
                <span className="addOrderText">Add</span>
              </button>
            </div>
          </div>
          <div className="orderWrap">
            <ChannelsTable />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Channels;
