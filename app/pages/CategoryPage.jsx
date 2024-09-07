"use client";
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { TextField, Button, Switch, IconButton } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import { useRouter } from 'next/navigation'

function CategoryPage() {
    const { categoryId } = useParams()
    const [categoryData, setCategoryData] = useState({
        id: -1,
        title: '',
        published: 1,
        position: 1,
        logo: '',
    })

    const [linkDetails, setLinkDetails] = useState({
        title: '',
        position: 1,
        drm: '',
        type: '',
        url: '',
    })

    useEffect(() => {
        categoryId > 0 &&
            axios
                .get(`/category_by_id?id=${categoryId}`, {
                    withCredentials: true,
                })
                .then((res) => {
                    if (res.data != null) {
                        console.log(res.data[1])
                        setCategoryData(res.data)
                    }
                })
    }, [categoryId])

    const saveCategoryChanges = () => {
        const action =
            categoryId === 'new' ? 'insert_category' : 'update_category'
        axios
            .post(
                `/${action}`,
                {
                    category: categoryData,
                },
                {
                    withCredentials: true,
                }
            )
            .then((res) => {
                if (res.data === 'success') {
                    navigate(-1)
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
                        <IconButton onClick={() => navigate(-1)}>
                            <ArrowBack />
                        </IconButton>
                        <div>
                            {' '}
                            {categoryId === 'new' ? (
                                <h3 className="pb-5 font-bold">Add Category</h3>
                            ) : (
                                <h3 className="pb-5 font-bold">
                                    Edit Category
                                    <font className="maincolor bold">
                                        #{categoryId}
                                    </font>
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
                                    label="Category Title"
                                    value={categoryData.title}
                                    onChange={(e) =>
                                        setCategoryData({
                                            ...categoryData,
                                            title: e.target.value,
                                        })
                                    }
                                />

                                <TextField
                                    id="outlined-number"
                                    label="Category Position"
                                    type="number"
                                    value={categoryData.position}
                                    onChange={(e) =>
                                        setCategoryData({
                                            ...categoryData,
                                            position: e.target.value,
                                        })
                                    }
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </div>
                            <TextField
                                label="Logo"
                                value={categoryData.logo}
                                onChange={(e) =>
                                    setLinkDetails({
                                        ...linkDetails,
                                        url: e.target.value,
                                    })
                                }
                                style={{ width: 500 }}
                            />
                            <div className="flex items-center">
                                <p>Published</p>
                                <Switch
                                    label="Published"
                                    checked={categoryData.published}
                                    onChange={(event) => {
                                        setCategoryData({
                                            ...categoryData,
                                            published: event.target.checked,
                                        })
                                    }}
                                />
                            </div>
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
