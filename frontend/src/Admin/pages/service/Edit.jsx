import React, { useContext, useEffect, useState } from "react";
import Input from "../../../Utils/Input";
import SelectBox from "../../../Utils/SelectBox";
import Textarea from "../../../Utils/Textarea";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import useAxios from "../../../Hooks/useAxios";
import TextEditor from "../../../Utils/TextEditor";

function Edit() {
  const { data, handleGetRow, getDataSelectBox } = useAxios();
  const { id } = useParams();
  const App_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    handleGetRow("service", id);
  }, [id]);

  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      const cateResult = await getDataSelectBox("category/list");
      setCategory(cateResult);
    };

    fetchCategory();
  }, []);

  useEffect(() => {
    setFormData({
      category: data.category,
      price: data.price,
      time: data.time,
      duration: data.duration,
      status: data.status,
      description: data.description,
    });
  }, [data]);
  const { token, notification } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    category: "",
    price: "",
    time: "",
    duration: "",
    status: "active",
    description: "",
    textdescription: "",
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
      const response = await axios.put(`${App_URL}/service/${id}`, formData, {
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
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg">
        <div className="border-b px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-700">Edit Service</h2>
        </div>
        <form className="p-6 space-y-5">
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
          <div className="grid grid-cols-2 gap-4 mb-0">
            <div className=" ">
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
            <div className="">
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

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              onClick={handleSubmit}
              type="submit"
              className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Save
            </button>

            <button
              type="reset"
              className="w-full sm:w-auto px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
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
