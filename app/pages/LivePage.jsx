"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  TextField,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Switch,
  IconButton,
} from "@mui/material";
import LogoPickerDialog from "../Components/LogoPickerDialog";
import { ArrowBack } from "@mui/icons-material";

function LivePage() {
  const { liveId } = useParams();
  const [liveData, setLiveData] = useState({
    live: {
      id: -1,
      type: "",
      tournament_name: "",
      category_id: -1,
      team_a_name: "",
      team_a_logo: "",
      team_b_name: "",
      team_b_logo: "",
      startTime: "",
      endTime: "",
      position: "",
      stv: 1,
      published: 1,
      krira: 1,
    },
    links: [],
  });
  const [open, setOpen] = React.useState(false);
  const [isTeamA, setIsTeamA] = useState(true);
  const [deletedLinks, setDeletedLinks] = useState({ ids: [] });

  const [linkDetails, setLinkDetails] = useState({
    title: "",
    position: 1,
    drm: "",
    type: "",
    url: "",
  });
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setIsTeamA(true);
    setOpen(true);
  };
  const handleRightClickOpen = () => {
    setIsTeamA(false);
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  const handlePicker = (value) => {
    setOpen(false);
    isTeamA
      ? setLiveData({
          ...liveData,
          live: {
            ...liveData.live,
            team_a_logo: value,
          },
        })
      : setLiveData({
          ...liveData,
          live: {
            ...liveData.live,
            team_b_logo: value,
          },
        });
  };

  useEffect(() => {
    liveId > 0 &&
      axios
        .get(`/live_by_id?id=${liveId}`, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data != null) {
            console.log(res.data[1]);
            setLiveData({
              live: res.data[0],
              links: res.data[1],
            });
          }
        });
  }, [liveId]);

  const saveLiveChanges = () => {
    const action = liveId === "new" ? "add_live" : "update_live";
    axios
      .post(
        `/${action}`,
        {
          liveData: liveData,
          deletedIds: deletedLinks,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data === "success") {
          navigate(-1);
        } else {
          console.log(res.data);
        }
      });
  };

  const removeLink = (id) => {
    let array = liveData.links;
    const newList = array.filter((item) => item.id !== id);

    if (id !== -1) {
      setLiveData({
        ...liveData,
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
      <LogoPickerDialog
        onClick={handlePicker}
        open={open}
        onClose={handleClose}
      />
      <div className="w-full h-full pt-10 pl-10">
        <div className="flex items-center">
          <IconButton onClick={()=>navigate(-1)}>
            <ArrowBack />
          </IconButton>
          <div>
            {" "}
            {liveId === "new" ? (
              <h3 className="font-bold pb-5">Add Live</h3>
            ) : (
              <h3 className="font-bold pb-5">
                Edit Live
                <font className="maincolor bold">#{liveId}</font>
              </h3>
            )}
          </div>
        </div>
        <div className="inputGroup">
          <Box className="space-y-5" component="form">
            <div className="flex space-x-2 items-center">
              <TextField
                required
                id="outlined-required"
                label="Team A Name"
                value={liveData.live ? liveData.live.team_a_name : ""}
                onChange={(e) =>
                  setLiveData({
                    ...liveData,
                    live: {
                      ...liveData.live,
                      team_a_name: e.target.value,
                    },
                  })
                }
              />

              <TextField
                required
                id="outlined-required"
                label="Team A Logo"
                value={liveData.live ? liveData.live.team_a_logo : ""}
                onChange={(e) =>
                  setLiveData({
                    ...liveData,
                    live: {
                      ...liveData.live,
                      team_a_logo: e.target.value,
                    },
                  })
                }
              />
              <Button
                size="small"
                variant="contained"
                onClick={handleClickOpen}
              >
                Pick
              </Button>
            </div>
            <div className="flex space-x-2 items-center">
              <TextField
                label="Team B Name"
                value={liveData.live ? liveData.live.team_b_name : ""}
                onChange={(e) =>
                  setLiveData({
                    ...liveData,
                    live: {
                      ...liveData.live,
                      team_b_name: e.target.value,
                    },
                  })
                }
              />

              <TextField
                label="Team B Logo"
                value={liveData.live ? liveData.live.team_b_logo : ""}
                onChange={(e) =>
                  setLiveData({
                    ...liveData,
                    live: {
                      ...liveData.live,
                      team_b_logo: e.target.value,
                    },
                  })
                }
              />
              <Button
                size="small"
                variant="contained"
                onClick={handleRightClickOpen}
              >
                Pick
              </Button>
            </div>

            <div className="flex space-x-2 items-center">
              <TextField
                label="Tournament Name"
                value={liveData.live ? liveData.live.tournament_name : ""}
                onChange={(e) =>
                  setLiveData({
                    ...liveData,
                    live: {
                      ...liveData.live,
                      tournament_name: e.target.value,
                    },
                  })
                }
              />

              <TextField
                label="Type"
                value={liveData.live ? liveData.live.type : ""}
                onChange={(e) =>
                  setLiveData({
                    ...liveData,
                    live: {
                      ...liveData.live,
                      type: e.target.value,
                    },
                  })
                }
              />
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className="flex space-x-2 items-center">
                <DateTimePicker
                  label="Start Time"
                  value={
                    liveData?.live?.startTime
                      ? dayjs(liveData.live.startTime)
                      : dayjs()
                  }
                  onChange={(newValue) =>
                    setLiveData({
                      ...liveData,
                      live: {
                        ...liveData.live,
                        startTime: newValue,
                      },
                    })
                  }
                />

                <DateTimePicker
                  label="End Time"
                  value={
                    liveData?.live?.endTime
                      ? dayjs(liveData.live.endTime)
                      : dayjs()
                  }
                  onChange={(newValue) =>
                    setLiveData({
                      ...liveData,
                      live: {
                        ...liveData.live,
                        endTime: newValue,
                      },
                    })
                  }
                />
              </div>
            </LocalizationProvider>
            <div className="flex space-x-2 items-center">
              <TextField
                id="outlined-number"
                label="Live Position"
                type="number"
                value={liveData?.live ? liveData.live.position : 1}
                onChange={(e) =>
                  setLiveData({
                    ...liveData,
                    live: {
                      ...liveData.live,
                      position: e.target.value,
                    },
                  })
                }
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>

            <div className="flex space-x-6 items-center">
              <div className="flex items-center">
                <p>Published</p>
                <Switch
                  label="Published"
                  checked={liveData?.live ? liveData.live.published : false}
                  onChange={(event) => {
                    setLiveData({
                      ...liveData,
                      live: {
                        ...liveData.live,
                        published: event.target.checked,
                      },
                    });
                  }}
                />
              </div>

              <div className="flex items-center">
                <p>Krira</p>
                <Switch
                  label="Krira"
                  checked={liveData?.live ? liveData.live.krira : false}
                  onChange={(event) => {
                    setLiveData({
                      ...liveData,
                      live: {
                        ...liveData.live,
                        krira: event.target.checked,
                      },
                    });
                  }}
                />
              </div>

              <div className="flex items-center">
                <p>STV</p>
                <Switch
                  label="STV"
                  checked={liveData?.live ? liveData.live.stv : false}
                  onChange={(event) => {
                    setLiveData({
                      ...liveData,
                      live: {
                        ...liveData.live,
                        stv: event.target.checked,
                      },
                    });
                  }}
                />
              </div>
            </div>

            <div className="space-y-3 mr-20">
              <h1 className="font-bold">Links</h1>
              <div>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow key={"1"}>
                        <TableCell align="center">Title</TableCell>
                        <TableCell align="center">Position</TableCell>
                        <TableCell align="center">Type</TableCell>
                        <TableCell align="center">DRM</TableCell>
                        <TableCell align="center">URL</TableCell>
                        <TableCell align="center">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {liveData.links?.map((link) => (
                        <TableRow key={link.id}>
                          <TableCell align="center">{link.title}</TableCell>
                          <TableCell align="center">{link.position}</TableCell>
                          <TableCell align="center">{link.type}</TableCell>
                          <TableCell align="center">{decode(link.drm)}</TableCell>
                          <TableCell align="center">{decode(link.url)}</TableCell>
                          <TableCell align="center">
                            <Button onClick={() => removeLink(link.id)}>
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
              <h1 className="font-bold">Add More</h1>
              <div className="flex space-x-3">
                <TextField
                  label="Title"
                  value={linkDetails.title}
                  onChange={(e) =>
                    setLinkDetails({
                      ...linkDetails,
                      title: e.target.value,
                    })
                  }
                />
                <TextField
                  id="outlined-number"
                  label="Position"
                  type="number"
                  value={linkDetails.position}
                  onChange={(e) =>
                    setLinkDetails({
                      ...linkDetails,
                      position: Number(e.target.value),
                    })
                  }
                />
                <TextField
                  label="Type"
                  value={linkDetails.type}
                  onChange={(e) =>
                    setLinkDetails({
                      ...linkDetails,
                      type: e.target.value,
                    })
                  }
                />
                <TextField
                  label="Drm"
                  value={linkDetails.drm}
                  onChange={(e) =>
                    setLinkDetails({
                      ...linkDetails,
                      drm: e.target.value,
                    })
                  }
                />
              </div>
              <TextField
                label="Url"
                value={linkDetails.url}
                onChange={(e) =>
                  setLinkDetails({
                    ...linkDetails,
                    url: e.target.value,
                  })
                }
                style={{ width: 874 }}
              />
              <div className="">
                <Button
                  onClick={() => {
                    setLiveData({
                      ...liveData,
                      links: [...liveData.links, linkDetails],
                    });

                    setLinkDetails({
                      title: "",
                      position: 1,
                      drm: "",
                      type: "",
                      url: "",
                    });
                  }}
                >
                  Add Link
                </Button>
              </div>
            </div>
            <div className="w-96 grid justify-items-center">
              <Button variant="contained" onClick={() => saveLiveChanges()}>
                Save
              </Button>
            </div>
          </Box>
        </div>
      </div>
    </div>
    </>
  );
}

export default LivePage;
