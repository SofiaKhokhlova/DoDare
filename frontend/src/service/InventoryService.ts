import axios from "axios";

export const getAllItemsInInventory = (token: any) => axios.get("http://localhost:8080/api/inventory/getUserItems", {
    headers: {
        'Authorization': `Bearer ${token}`
    }
});

export const getItemsForCharacter = (userId: number) => axios.get(`http://localhost:8080/api/character/getCharacter?userId=${userId}`);