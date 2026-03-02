import axios from "axios";

// construct base URL from environment variable with fallback
const rawUrl = import.meta.env.VITE_API_URL;
console.log("API URL:", rawUrl);

let baseUrl;
if (rawUrl && typeof rawUrl === "string") {
  // ensure there is no trailing slash before appending
  const trimmed = rawUrl.replace(/\/+$/, "");
  baseUrl = trimmed.endsWith("/api") ? trimmed : `${trimmed}/api`;
} else {
  // fallback to localhost development server
  baseUrl = "http://localhost:5000/api";
  console.warn("VITE_API_URL is undefined; using fallback localhost URL. This is not suitable for production.");
}
console.log("Computed baseURL:", baseUrl);

const API = axios.create({
  baseURL: baseUrl
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
