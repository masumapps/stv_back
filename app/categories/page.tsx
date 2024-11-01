"use client";
import axios from "axios";
import "./../Styles/popup.css";
import { ErrorOutline} from "@mui/icons-material";
import React, { useEffect, useState } from "react";

import { usePaging } from "../Components/PagingView";
import ListPage from "../Components/ListPage";
import Image from "next/image";
import { TableAction } from "../Components/TableAction";
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
                   {category.logo ?
                    <Image
                      src={category.logo}
                      className="w-10"
                      width={100}
                      height={100}
                      alt="category log"
                    />: <ErrorOutline/>}
                  </td>
                  <td>{category.position}</td>
                  <td>{category.published === 1 ? "🟢" : "🔴"}</td>
                  <td>
                    <TableAction
                    href={`/categories/${category.id}`}
                    type={"category"}
                    id={category.id}
                    page={"categories"}
                    />
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
