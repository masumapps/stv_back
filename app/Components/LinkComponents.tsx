import React, { useState } from 'react'
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
  } from "@mui/material";

const LinkComponents = (
    {data,onAddLink,onUpdateLink,onRemoveLink,onSave}
) => {

    const [linkDetails, setLinkDetails] = useState({
        id: -1,
        title: "",
        position: 1,
        drm: "",
        type: "",
        url: "",
      });
  return (
    <div>
          <div className="space-y-3 mr-20">
                <h1 className="font-bold">Links</h1>
                <div>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow key={"1"}>
                        
                        <TableCell align="center">Action</TableCell>
                          <TableCell align="center">Title</TableCell>
                          <TableCell align="center">Position</TableCell>
                          <TableCell align="center">Type</TableCell>
                          <TableCell align="center">DRM</TableCell>
                          <TableCell align="center">URL</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data.links?.map((link) => (
                          <TableRow key={link.id}>
                               <TableCell align="center">
                              <Button onClick={() => onRemoveLink(link.id)}>
                                Delete
                              </Button>
                              <Button onClick={() => 
                                setLinkDetails({
                                  id:link.id,
                                  title:link.title,
                                  position:link.position,
                                  drm:decode(link.drm),
                                  type:link.type,
                                  url:decode(link.url)
                                })
                              }>
                                Edit
                                </Button>
                            </TableCell>
                            <TableCell align="center">{link.title}</TableCell>
                            <TableCell className='w-1' align="center">{link.position}</TableCell>
                            <TableCell className="w-1" align="center">{link.type}</TableCell>
                            <TableCell align="center">{decode(link.drm)}</TableCell>
                            <TableCell align="center"><p className='overflow-x-auto min-w-fit'>{decode(link.url)}</p></TableCell>
                         
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
                    (linkDetails.id > 0) ? onUpdateLink(linkDetails) : onAddLink(linkDetails)

                      setLinkDetails({
                        id: -1,
                        title: "",
                        position: 1,
                        drm: "",
                        type: "",
                        url: "",
                      });
                    }}
                  >
                    {linkDetails.id > 0 ? "Update Link" : "Add Link"} 
                  </Button>
                </div>
              </div>
              <div className="w-96 grid justify-items-center">
                <Button
                  variant="contained"
                  onClick={() => onSave()}
                >
                  Save
                </Button>
              </div>
    </div>
  )
}

export function decode(data) {
    try{
       return atob(reverseString(atob(data)))
    }
    catch(err){
       return  data
    }
   }
   
   function reverseString (str) {
       return [...str].reverse().join('')
     }
  
  

export default LinkComponents