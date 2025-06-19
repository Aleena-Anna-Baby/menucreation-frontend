import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", 
});

export const getMenuItems = () => API.get("/api/menu");

export const addMenuItem = (item) => API.post("/api/menu", item);

export const deleteMenuItem = (id) => API.delete(`/api/menu/${id}`);

export const updateMenuItem = (id, updatedItem) => API.put(`/api/menu/${id}`, updatedItem);
