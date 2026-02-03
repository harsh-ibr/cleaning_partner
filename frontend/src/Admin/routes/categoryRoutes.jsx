import { Route } from "react-router-dom";
import List from "../pages/category/List";
import Add from "../pages/category/Add";
import Edit from "../pages/category/Edit";

const categoryRoutes = [
  <Route key="category-list" path="category" element={<List />} />,
  <Route key="category-add" path="category/create" element={<Add />} />,
  <Route key="category-edit" path="category/edit/:id" element={<Edit />} />,
];

export default categoryRoutes;
