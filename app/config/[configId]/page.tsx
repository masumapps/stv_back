"use client";
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { TextField, Button, Switch, IconButton } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import { useRouter } from 'next/navigation'

function CategoryPage({params}) {
    const router = useRouter()
    const  configId  = params.configId
    const [categoryData, setCategoryData] = useState({
        id: -1,
        name: '',
        value:'',
        krira:''
    })

    useEffect(() => {
        configId > 0 &&
            axios
                .get(`/config_by_id?id=${configId}`, {
                    withCredentials: true,
                })
                .then((res) => {
                    if (res.data != null) {
                        setCategoryData(res.data)
                    }
                })
    }, [configId])

    const saveCategoryChanges = () => {
        const action =
            configId === 'new' ? 'newsetting' : 'update_setting'
        axios
            .post(
                `/${action}`,
                {
                    settingDetails: categoryData,
                },
                {
                    withCredentials: true,
                }
            )
            .then((res) => {
                if (res.data === 'success') {
                    router.back()
                } else {
                    console.log(res.data)
                }
            })
    }

    return (
        <>
            <div className="relative ml-80 flex flex-col">
                <div className="h-full w-full pl-10 pt-10">
                    <div className="flex items-center">
                        <IconButton onClick={() => router.back()}>
                            <ArrowBack />
                        </IconButton>
                        <div>
                            {' '}
                            {configId === 'new' ? (
                                <h3 className="pb-5 font-bold">Add Config</h3>
                            ) : (
                                <h3 className="pb-5 font-bold">
                                    Edit Config
                                    <p className="maincolor bold">
                                        #{configId}
                                    </p>
                                </h3>
                            )}
                        </div>
                    </div>
                    <div className="inputGroup">
                        <Box className="space-y-5" component="form">
                            <div className="flex items-center space-x-2">
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Name"
                                    value={categoryData.name}
                                    onChange={(e) =>
                                        setCategoryData({
                                            ...categoryData,
                                            name: e.target.value,
                                        })
                                    }
                                />

                               
                            </div>
                            <TextField
                                label="Value"
                                value={categoryData.value}
                                onChange={(e) =>
                                    setCategoryData({
                                        ...categoryData,
                                        value: e.target.value,
                                    })
                                }
                                style={{ width: 500 }}
                            />

                            
        <TextField
                                label="Krira"
                                value={categoryData.krira}
                                onChange={(e) =>
                                    setCategoryData({
                                        ...categoryData,
                                        krira: e.target.value,
                                    })
                                }
                                style={{ width: 500 }}
                            />
                         
                            <div className="grid w-96 justify-items-center">
                                <Button
                                    variant="contained"
                                    onClick={() => saveCategoryChanges()}
                                >
                                    Save
                                </Button>
                            </div>
                        </Box>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CategoryPage
