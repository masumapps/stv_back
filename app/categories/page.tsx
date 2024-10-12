"use client";
import axios from "axios";
import {ReadMoreRounded } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import Link from "next/link";

import { usePaging } from "../Components/PagingView";
import ListPage from "../Components/ListPage";
function Categories() {
  const [newCategoriesSubmitted, setNewCategoriesSubmitted] = useState(false);
  const [categoriesData, setCategoriesData] = useState([]);

  useEffect(() => {
    setNewCategoriesSubmitted(false);
    axios
      .get("/categories", { withCredentials: true })
      .then((res) => {
        if (res.data != null) {
          setCategoriesData(res.data);
        }
      });
  }, [newCategoriesSubmitted]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?"))
      axios
        .post("delete_category", { categoryId: id }, { withCredentials: true })
        .then((res) => {
          if (res.data === "success") {
            setNewCategoriesSubmitted(true);
          }
        });
  };

  const CategoriesTable = () => {
    const { PagingView, computedData } = usePaging(categoriesData);
    return (
      <>
        {" "}
        <PagingView />
        <table>
          <thead>
            <tr>
              <th>Category Id</th>
              <th>Category Title</th>
              <th>Logo</th>
              <th>Position</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {computedData.map((category, i) => {
              return (
                <tr key={i}>
                  <td>
                    <p className="maincolor">#</p>
                    {category.id}
                  </td>
                  <td>{category.title}</td>
                  <td>
                    <img
                      src={category.logo}
                      className="w-10"
                      alt="category log"
                    />
                  </td>
                  <td>{category.position}</td>
                  <td>{category.published === 1 ? "🟢" : "🔴"}</td>
                  <td>
                    <Link href={`/categories/${category.id}`}>
                      <ReadMoreRounded />
                    </Link>
                    <IconButton onClick={() => handleDelete(category.id)}>
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
    <ListPage path="/categories/new">
      <CategoriesTable />
    </ListPage>
  );
}
export default Categories;
