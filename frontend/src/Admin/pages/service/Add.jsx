import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import Input from "../../../Utils/Input";
import { useNavigate } from "react-router-dom";
import SelectBox from "../../../Utils/SelectBox";
import Textarea from "../../../Utils/Textarea";
import TextEditor from "../../../Utils/TextEditor";
import useAxios from "../../../Hooks/useAxios";

function Add() {
  const App_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { token, notification } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    category: "",
    time: "",
    duration: "",
    status: "active",
    description: "",
    textdescription: "",
  });
  const { getDataSelectBox } = useAxios();
  const [errForm, setErrForm] = useState({});

  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      const cateResult = await getDataSelectBox("category/list");
      setCategory(cateResult);
    };

    fetchCategory();
  }, []);

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
      const response = await axios.post(`${App_URL}/service`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFormData({
        category: "",
        price: "",
        time: "",
        duration: "",
        status: "active",
        description: "",
        textdescription: "",
      });
      notification("green", response.data.message);
      navigate("/admin/service");
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
      } else {
        notification("red", error.response.data.message);
      }
    }
  };

  return (
    <>
      <div class="w-full max-w-2xl bg-white shadow-lg rounded-lg">
        <div class="border-b px-6 py-4">
          <h2 class="text-lg font-semibold text-gray-700">Create Service</h2>
        </div>
        <form class="p-6 space-y-5">
          {/* <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            isRequired={true}
            error={errForm?.name}
            title="Name"
            placeholder="Enter service name"
          /> */}

          <SelectBox
            name="category"
            value={formData.category}
            onChange={handleChange}
            isRequired={true}
            error={errForm?.category}
            options={category}
          />

          <Input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            isRequired={true}
            error={errForm?.price}
            title="Price"
            placeholder="Enter service price"
          />
          <div class="grid grid-cols-2 gap-4 mb-0">
            <div class=" ">
              <Input
                name="time"
                type="number"
                value={formData.time}
                onChange={handleChange}
                isRequired={true}
                error={errForm?.time}
                title="Time"
                placeholder="Enter time"
              />
            </div>
            <div class="">
              <SelectBox
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                isRequired={true}
                error={errForm?.duration}
                options={[
                  { value: "minute", label: "Minutes" },
                  { value: "hour", label: "Hours" },
                  { value: "day", label: "Days" },
                ]}
              />
            </div>
          </div>

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

          <TextEditor
            title="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            error={errForm?.description}
          />

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

export default Add;
