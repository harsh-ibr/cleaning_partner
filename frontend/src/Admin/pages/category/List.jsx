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
        index: "name",
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
    type: "category",
    title: "Categories",
    createUrl: "/admin/category/create",
    editUrl: "/admin/category/edit/",
    deleteUrl: "/category/",
    bulkDelete: "category",
  };
  return (
    <>
      {/* <div className="max-w-7xl mx-auto bg-white shadow rounded-lg">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-700">Product List</h2>
        </div>

        <div className="overflow-x-auto"> */}
      {<DataTable table={tableData} />}
      {/* <table className="min-w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  #
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Role
                </th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-700">1</td>
                <td className="px-4 py-3 text-sm text-gray-700">Harsh Pal</td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  harsh@example.com
                </td>
                <td className="px-4 py-3 text-sm">
                  <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-700">
                    Admin
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <button className="text-blue-600 hover:underline mr-2">
                    Edit
                  </button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-700">2</td>
                <td className="px-4 py-3 text-sm text-gray-700">Amit Kumar</td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  amit@example.com
                </td>
                <td className="px-4 py-3 text-sm">
                  <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-700">
                    User
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <button className="text-blue-600 hover:underline mr-2">
                    Edit
                  </button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            </tbody>
          </table> */}
      {/* </div>
      </div> */}
    </>
  );
}

export default List;
