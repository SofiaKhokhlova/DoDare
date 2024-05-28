import axios from "axios";

export const getAllStoreItems = axios.get("http://localhost:8080/api/store/getItemsList");