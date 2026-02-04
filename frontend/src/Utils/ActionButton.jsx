import axios from "axios";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
// import useAxios from "../../Hooks/useAxios";

function ActionButton({ id, editUrl, deleteUrl, onDeleteSuccess }) {
  // const { handleDelete } = useAxios();
  // onDeleteSuccess(id);

  const manageDelete = async () => {
    // handleDelete(deleteUrl, id);
    onDeleteSuccess(id);
  };
  return (
    <>
      {editUrl && (
        <Link
          to={`${editUrl}/${id}`}
          className="px-4 py-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white border border-blue-500 hover:border-transparent rounded me-1"
        >
          Edit
          {/* <i className="bx bx-edit"></i> */}
        </Link>
      )}

      {deleteUrl && (
        <button
          type="button"
          onClick={() => manageDelete()}
          className="px-4 py-2 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white border border-red-500 hover:border-transparent rounded"
        >
          {/* <i className="bx bx-trash"></i> */}
          Delete
        </button>
      )}
    </>
  );
}

export default React.memo(ActionButton);
