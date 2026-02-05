import { Route } from "react-router-dom";
import List from "../pages/service/List";
import Add from "../pages/service/Add";
import Edit from "../pages/service/Edit";

const serviceRoutes = [
  <Route key="service-list" path="service" element={<List />} />,
  <Route key="service-add" path="service/create" element={<Add />} />,
  <Route key="service-edit" path="service/edit/:id" element={<Edit />} />,
];

export default serviceRoutes;
