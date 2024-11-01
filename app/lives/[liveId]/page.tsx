"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Image from "next/image";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField, Button, Switch, IconButton } from "@mui/material";
import LogoPickerDialog from "../../Components/LogoPickerDialog";
import { ArrowBack } from "@mui/icons-material";
import LinkComponents from "../../Components/LinkComponents";
import { useParams, useRouter } from "next/navigation";
import { useReportWebVitals } from "next/web-vitals";
import { ImagePreview } from "../../Components/Image";
import { revalidatePath } from "next/cache";

function LivePage() {
  useReportWebVitals((metric) => {
    console.log(metric);
  });
  const params = useParams();
  const router = useRouter();
  const liveId = params.liveId;
  const getCurrentTimeISO = () => {
    return new Date().toISOString();
  };
  const getTimeThreeDaysFromNow = () => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 3);
    return currentDate.toISOString();
  };

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
      startTime: getCurrentTimeISO(),
      endTime: getTimeThreeDaysFromNow(),
      position: "",
      stv: true,
      published: true,
      krira: true,
    },
    links: [],
  });
  const [open, setOpen] = React.useState(false);
  const [isTeamA, setIsTeamA] = useState(true);
  const [deletedLinks, setDeletedLinks] = useState({ ids: [] });

  const handleClickOpen = () => {
    setIsTeamA(true);
    setOpen(true);
  };
  const handleRightClickOpen = () => {
    setIsTeamA(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePicker = (value) => {
    setOpen(false);
    isTeamA
      ? setLiveData({
          ...liveData,
          live: {
            ...liveData.live,
            team_a_logo: value.url,
            team_a_name: value.title,
          },
        })
      : setLiveData({
          ...liveData,
          live: {
            ...liveData.live,
            team_b_name: value.title,
            team_b_logo: value.url,
          },
        });
  };

  useEffect(() => {
    liveId!== "new" &&
      axios
        .get(`/live_by_id?id=${liveId}`, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data != null) {
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
          revalidatePath("/lives","page");
          revalidatePath("/lives/[liveId]","page");
          router.push("/lives");
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

  const updateLink = (link) => {
    let array = liveData.links;
    const newList = array.filter((item) => item.id !== link.id);
    newList.push(link);

    if (link.id !== -1) {
      setLiveData({
        ...liveData,
        links: newList,
      });
      link.id &&
        setDeletedLinks({
          ...deletedLinks,
          ids: [...deletedLinks.ids, link.id],
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
            <IconButton onClick={() => router.back()}>
              <ArrowBack />
            </IconButton>
            <div>
              {" "}
              {liveId === "new" ? (
                <h3 className="font-bold pb-5">Add Live</h3>
              ) : (
                <h3 className="font-bold pb-5">
                  Edit Live
                  <span className="maincolor bold">#{liveId}</span>
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
                <ImagePreview src={liveData?.live?.team_a_logo} />
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
                <ImagePreview src={liveData?.live?.team_b_logo} />
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
                          startTime: newValue.toString(),
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
                          endTime: newValue.toString(),
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

              <LinkComponents
                data={liveData}
                onAddLink={(link) =>
                  setLiveData({
                    ...liveData,
                    links: [...liveData.links, link],
                  })
                }
                onRemoveLink={(id) => removeLink(id)}
                onUpdateLink={(link) => updateLink(link)}
                onSave={() => saveLiveChanges()}
              />
            </Box>
          </div>
        </div>
      </div>
    </>
  );
}

export default LivePage;
