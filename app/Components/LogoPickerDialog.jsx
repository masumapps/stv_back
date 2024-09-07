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
import { Clear, Edit } from "@mui/icons-material";

import SearchBar from "../Components/SearchBar";

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

  const handleSearchChange = (newFilteredData) => {
    setFilteredData(newFilteredData);
  };
  useEffect(() => {
    console.log(query)
    setFilteredData(logos.filter((logo) => logo.title.toLowerCase().includes(query.toLowerCase())));
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

  const saveOrderChanges = () => {
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
          }
          else {
            console.log(res.data)
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
      <DialogTitle>Logos</DialogTitle>
      <DialogContent>
        <div>
          <div className="flex flex-row p-5 space-x-2 justify-center items-center">
            {logo.title && <Clear
            onClick={() => setLogo({ ...logo, title: "", url: "" })}/>}
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
            <Button variant="contained" onClick={() => saveOrderChanges()}>
              {buttonText}
            </Button>
          </div>
      
          <div className="flex flex-row p-5 space-y-2">
      <TextField
      label="Search"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      fullWidth
      />
      </div>

          

          <ImageList
            sx={{ width: 500, height: 450 }}
            cols={4}
            rowHeight={121}
          >
            {filteredData.map((item) => (
              <ImageListItem key={item.url}>
                <div>
                  <img
                    height={100}
                    width={100}
                    src={item.url}
                    alt={item.url}
                    loading="lazy"
                    onClick={() => {
                      onClick(item);
                    }}
                  />
                  <ImageListItemBar
                    className="w-100 justify-center"
                    title={item.title}
                    position="below"
                    actionIcon={
                      <Edit
                        onClick={() => {
                          setButtonText("Edit");
                          setLogo(item);
                        }}
                      />
                    }
                    actionPosition="right"
                  />
                </div>
              </ImageListItem>
            ))}
          </ImageList>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogoPickerDialog;
