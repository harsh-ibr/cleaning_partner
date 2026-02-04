import React, { useContext, useEffect, useState } from "react";
import Input from "../../../Utils/Input";
import SelectBox from "../../../Utils/SelectBox";
import Textarea from "../../../Utils/Textarea";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import useAxios from "../../../Hooks/useAxios";

function Edit() {
  const { data, handleGetRow } = useAxios();
  const { id } = useParams();
  const App_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    handleGetRow("category", id);
  }, [id]);

  useEffect(() => {
    setFormData({
      name: data.name,
      status: data.status,
      description: data.description,
    });
  }, [data]);
  const { token } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    status: "",
    description: "",
  });
  const [errForm, setErrForm] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrForm({});
    try {
      const response = await axios.put(`${App_URL}/category/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFormData({
        name: "",
        status: "",
        description: "",
      });
      navigate("/admin/category");
    } catch (error) {
      if (error.status === 400) {
        const fieldsError = error.response.data.errors;
        fieldsError.map((eRow, index) => {
          const fieldName = eRow.field;
          const fieldValue = eRow.message;
          // console.log(fieldName, fieldValue);
          setErrForm((prev) => ({
            ...prev,
            [fieldName]: fieldValue,
          }));
        });
      }
    }
  };

  return (
    <>
      <div class="w-full max-w-2xl bg-white shadow-lg rounded-lg">
        <div class="border-b px-6 py-4">
          <h2 class="text-lg font-semibold text-gray-700">Edit Category</h2>
          {data.name}
        </div>

        <form class="p-6 space-y-5">
          <div>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              isRequired={true}
              error={errForm?.name}
              title="Name"
              placeholder="Enter category name"
            />
          </div>
          <div>
            <SelectBox
              name="status"
              value={formData.status}
              onChange={handleChange}
              isRequired={true}
              error={errForm?.status}
              title="Status"
              options={[
                { value: "active", label: "Active" },
                { value: "inactive", label: "Inactive" },
              ]}
            />
          </div>

          <div>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              isRequired={false}
              error={errForm?.description}
              title="Description"
            />
          </div>

          <div class="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              onClick={handleSubmit}
              type="submit"
              class="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Save
            </button>

            <button
              type="reset"
              class="w-full sm:w-auto px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Edit;
