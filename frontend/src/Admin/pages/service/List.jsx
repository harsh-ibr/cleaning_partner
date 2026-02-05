import React from "react";
import DataTable from "../../../Utils/DataTable.jsx";

function List() {
  const tableData = {
    headers: [
      {
        column: "Row Checkbox",
        index: "row_checkbox",
      },
      {
        column: "Name",
        index: "category",
      },
      {
        column: "Price ($)",
        index: "price",
      },
      {
        column: "Duration",
        index: "time",
      },
      {
        column: "Duration Type",
        index: "duration",
      },
      {
        column: "status",
        index: "status",
      },

      {
        column: "Date",
        index: "createdAt",
      },
      {
        column: "Action",
        index: "action",
      },
    ],
    type: "service",
    title: "Services",
    createUrl: "/admin/service/create",
    editUrl: "/admin/service/edit/",
    deleteUrl: "/service/",
    bulkDelete: "service",
  };
  return (
    <>
      <div>{<DataTable table={tableData} />}</div>
    </>
  );
}

export default List;
