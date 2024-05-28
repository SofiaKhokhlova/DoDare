import axios from "axios";

export const getAllItemsInInventory = (token: any) => axios.get("http://localhost:8080/api/inventory/getUserItems", {
    headers: {
        'Authorization': `Bearer ${token}`
    }
});