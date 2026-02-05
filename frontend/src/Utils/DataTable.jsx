import React, { useContext, useEffect, useState } from "react";
import ImageList from "./ImageList";
import TagsList from "./TagsList";
import StatusList from "./StatusList";
import ActionButton from "./ActionButton";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Pagination from "./Pagination";
import useAxios from "../Hooks/useAxios";
import Alert from "./Alert";

function DataTable({ table }) {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const tableTitle = table?.title;
  const tableHeader = table?.headers;
  const createUrl = table?.createUrl;
  const editUrl = table?.editUrl;
  const deleteUrl = table?.deleteUrl;
  const bulkDelete = table?.bulkDelete;
  const type = table?.type;

  const { token, alert, notification } = useContext(AuthContext);
  const { data, pagination, handleTableList, handleBulkDelete } = useAxios();
  const [tableBody, setTableBody] = useState(data);
  const [checkedId, setCheckedId] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sucessMsg, setSucessMsg] = useState("");

  useEffect(() => {
    handleTableList(type, currentPage);
  }, [currentPage, type]);

  useEffect(() => {
    setTableBody(data || []);
  }, [data]); // 👈 update when data changes
  const selectedIds = (id) => {
    setCheckedId((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleRowDelete = (deletedId) => {
    setTableBody((prev) => prev.filter((row) => row._id !== deletedId));
    setCheckedId((prev) => prev.filter((id) => id !== deletedId));
  };

  const handleAlert = () => {
    notification("", "");
  };
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setCheckedId(tableBody.map((row) => row._id));
    } else {
      setCheckedId([]);
    }
  };

  const renderValue = (row, columnName) => {
    const value = row?.[columnName];
    if (columnName === "thumbnail" || columnName === "image") {
      return <ImageList thumbnail={value} />;
    }

    if (columnName === "Row Checkbox" || columnName === "row_checkbox") {
      return (
        <input
          type="checkbox"
          id="_id"
          onChange={() => selectedIds(row._id)}
          value={row._id}
          checked={checkedId.includes(row._id)}
        />
      );
    }

    if (columnName === "action" || columnName === "Action") {
      return (
        <ActionButton
          id={row._id}
          editUrl={editUrl}
          deleteUrl={deleteUrl}
          onDeleteSuccess={handleRowDelete}
        />
      );
    }
    if (value === null || value === undefined) return "";

    if (typeof value === "object" && columnName === "tags") {
      return <TagsList tags={value} />;
    }
    if (typeof value === "object") {
      return value.name ?? value._id ?? " ";
    }

    if (columnName === "status") {
      return <StatusList status={value} />;
    }
    return value;
  };

  return (
    <>
      <div className="max-w-7xl mx-auto h-20">
        <Alert
          color={alert?.color}
          message={alert?.message}
          onClose={handleAlert}
        />
      </div>
      <div className="max-w-7xl mx-auto bg-white shadow rounded-lg">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-700">
            {tableTitle && <span> {tableTitle}</span>}
            {bulkDelete && (
              <button
                onClick={() => handleBulkDelete(bulkDelete, checkedId)}
                className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-1 px-4 border border-red-500 hover:border-transparent rounded float-end"
              >
                <i className="bx bx-trash"></i>
                &nbsp; Bulk Delete
              </button>
            )}
            {createUrl && (
              <Link
                to={createUrl}
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded float-end me-2"
              >
                <i className="bx bx-plus"></i> Create
              </Link>
            )}
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="table min-w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                {tableHeader && tableHeader.length > 0
                  ? tableHeader.map((column, index) => {
                      if (column.column == "Row Checkbox") {
                        return (
                          <th
                            className="px-4 py-3 text-left text-sm font-semibold text-gray-600"
                            key={index}
                          >
                            <input
                              type="checkbox"
                              checked={
                                tableBody.length > 0 &&
                                tableBody.length === checkedId.length
                              }
                              onChange={handleSelectAll}
                            />
                          </th>
                        );
                      } else {
                        return (
                          <th
                            className="px-4 py-3 text-left text-sm font-semibold text-gray-600"
                            key={index}
                          >
                            {column.column}
                          </th>
                        );
                      }
                    })
                  : null}
              </tr>
            </thead>
            <tbody className="divide-y">
              {tableBody && tableBody.length > 0 ? (
                tableBody.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {tableHeader && tableHeader.length > 0
                      ? tableHeader.map((column, colIndex) => {
                          const columnName = column.index; // e.g. "name", "sku"
                          return (
                            <td
                              key={colIndex}
                              className="px-4 py-3 text-sm text-gray-700"
                            >
                              {renderValue(row, columnName)}
                            </td>
                          );
                        })
                      : null}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    className="text-muted px-4 py-3 text-sm text-gray-700"
                    style={{ textAlign: "center" }}
                    colSpan={tableHeader?.length || 1}
                  >
                    No data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="float-end mt-3 m-3">
            <Pagination
              pagination={pagination}
              onPageChange={(p) => setCurrentPage(p)}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default DataTable;
