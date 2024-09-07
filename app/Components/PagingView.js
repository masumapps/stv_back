import { useState } from "react";
import Pagination from "./Pagination";

export function usePaging(data){
    const [currentPage, setCurrentPage] = useState(1);
   
    const totalChannels = data.length;
    const computedData = data.slice(
      (currentPage - 1) * itemsPerPage,
      (currentPage - 1) * itemsPerPage + itemsPerPage
    );
    const computedCategoryLength = computedData.length;

    const PagingView=()=>{
        return (   <div className="tableResultWrap">
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
          </div>)
    }

    return {PagingView,computedData}
}

export  const itemsPerPage = 30;