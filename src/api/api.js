import axios from "axios";

const API = axios.create({
  baseURL: "https://laxmi-agency-backend.onrender.com/api"
});

// ADMIN
export const createCategory = (data) => API.post("/categories", data);
export const createItem = (data) => API.post("/items", data);
export const createSeller = (data) => API.post("/sellers", data);
export const createStock = (data) => API.post("/stocks", data);

// TABLE DATA
export const getStocks = () => API.get("/stocks");
export const getItems = () => API.get("/items");

// INQUIRIES
export const submitInquiry = (data) => API.post("/inquiries", data);
export const getInquiries = () => API.get("/inquiries");

export default API;
