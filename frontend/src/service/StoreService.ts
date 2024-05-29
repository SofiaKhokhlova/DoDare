import axios from "axios";

export const getAllStoreItems = () => axios.get("http://localhost:8080/api/store/getItemsList");

export const buyStoreItem = (itemId: number, token: any) => axios.post(`http://localhost:8080/api/store/buy/${itemId}`, itemId, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
});