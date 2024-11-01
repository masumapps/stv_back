import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  TextField,
} from "@mui/material";
import axios from "axios";
import Image from "next/image";
import { AddAPhoto, Clear, EditRounded, Search } from "@mui/icons-material";

const LogoPickerDialog = (props) => {
  const initalLogo = {
    id: -1,
    title: "",
    url: "",
  };

  const { open, onClose, onClick } = props;

  const [logos, setLogos] = useState([]);
  const [logoUpdated, setLogoUpdated] = useState(false);
  const [logo, setLogo] = useState(initalLogo);
  const [buttonText, setButtonText] = useState("Add");

  const [filteredData, setFilteredData] = useState([]);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showForm, setShowForm] = useState(false);


  useEffect(() => {
    setFilteredData(
      logos.filter((logo) =>
        logo.title.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query]);
  

  useEffect(() => {
    axios
      .get(`/logos`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data != null) {
          setLogoUpdated(false);
          setLogos(res.data);
          setFilteredData(res.data);
        }
      });
  }, [logoUpdated]);

  const handleLogoEdit = (logo) => {
    setLogo(logo);
    setButtonText("Update");
    setShowForm(true);
  };

  const handleShowForm = () => {
    setLogo(initalLogo);
    setButtonText("Add");
    setShowForm(true);
  }

  const saveEditChanges = () => {
    if (logo.url) {
      axios
        .post(
          "/newlogo",
          {
            logo: logo,
          },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.data === "success") {
            setLogo(initalLogo);
            setButtonText("Add");
            setLogoUpdated(true);
          } else {
            console.log(res.data);
          }
        });
    }
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth="md"
      open={open}
      onClose={() => {
        setLogo(initalLogo);
        setButtonText("Add");
        onClose();
      }}
    >
      <DialogTitle>
        <div className="flex flex-row justify-between items-center">
          <span>Logo Picker</span>
          <div className="flex flex-row space-x-2 items-center">
            <IconButton onClick={() => setShowSearch(!showSearch)}>
              <Search />
            </IconButton>
            <IconButton onClick={() => handleShowForm()}>
              <AddAPhoto />
            </IconButton>
           </div>
           </div>
      </DialogTitle>
      <DialogContent>
        <div >
          <div >
            {showForm &&<div className="flex flex-row py-2 space-x-2 justify-center items-center
            ">
              {logo.title && (
                <Clear onClick={() => setLogo({ ...logo, title: "", url: "" })} />
              )}
              <TextField
                label="title"
                value={logo.title}
                onChange={(e) => setLogo({ ...logo, title: e.target.value })}
              />
              <TextField
                label="Add New Logo"
                fullWidth
                value={logo.url}
                onChange={(e) => setLogo({ ...logo, url: e.target.value })}
              />
              <Button variant="contained" onClick={() => saveEditChanges()}>
                {buttonText}
              </Button>
            </div>}
            {showSearch &&<div className="flex flex-row py-2 space-y-1">
              <TextField
                label="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                fullWidth
              />
            </div>}
        </div>

          <div className="grid grid-cols-5 gap-3 h-1/6 overflow-y-auto ">
            {filteredData.map((item) => (
              <div
                key={item.id}
                className="h-40 w-full max-w-full rounded-lg object-cover object-center relative px-2"
              >
                <Image
                  height={0}
                  width={0}
                  sizes="100vw"
                  style={{
                    width: "160px",
                    height: "6rem",
                    objectFit: "cover",
                    objectPosition: "center",
                    borderRadius: "0.5rem",
                    border: "1px solid #ddd",
                  }}
                  src={item.url}
                  alt={item.title}
                  loading="lazy"
                  onClick={() => {
                    onClick(item);
                  }}
                />
                <div className="flex justify-between items-center bg-gray-50 px-2 border border-gray-200  rounded-lg my-2">
                  <h1 className="line-clamp-1">{item.title}</h1>
                  <IconButton onClick={() => handleLogoEdit(item)}>
                    <EditRounded />
                  </IconButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogoPickerDialog;
