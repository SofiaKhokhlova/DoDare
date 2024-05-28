import "../css/inventory.css";
import {useEffect, useState} from "react";
import {getAllItemsInInventory} from "../service/InventoryService.ts";

function InventoryComponent () {
    const token = localStorage.getItem("accessToken");

    type Item = {
      id: number;
      name: string;
      description: string;
      fileName: string;
      type: string;
      price: number;
      imageUrl: string;
    };

    const [headItems, setHeadItems] = useState<Item[]>([]);
    const [bodyItems, setBodyItems] = useState<Item[]>([]);
    const [legsItems, setLegsItems] = useState<Item[]>([]);

    useEffect(() => {
        getAllItemsInInventory(token)
            .then(response => {
                const items: Item[] = response.data;
                console.log(response.data);

                const headItemsResponse = items.filter(item => item.type === "HEAD");
                const bodyItemsResponse = items.filter(item => item.type === "BODY");
                const legsItemsResponse = items.filter(item => item.type === "LEGS");
                console.log(headItemsResponse[0].fileName);

                setHeadItems(headItemsResponse);
                setBodyItems(bodyItemsResponse);
                setLegsItems(legsItemsResponse);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return(
        <>
            <div className="inventory-component">
                <p className="inventory-title">Your inventory</p>
                <div className="character-block"></div>
                <div className="items-container">
                    <p className="item-title">Head</p>
                    <div className="item-content">
                        {headItems.map((item) => (
                            <div key={item.id} className="item">
                                <img src={`${item.imageUrl}`} alt="head" className="item-img"/>
                            </div>
                        ))}
                    </div>
                    <p className="item-title">Body</p>
                    <div className="item-content">
                        {bodyItems.map((item) => (
                            <div key={item.id} className="item">
                                <img src={`${item.imageUrl}`} alt="" className="item-img"/>
                            </div>
                        ))}
                    </div>
                    <p className="item-title">Legs</p>
                    <div className="item-content">
                        {legsItems.map((item) => (
                            <div key={item.id} className="item">
                                <img src={`${item.imageUrl}`} alt="" className="item-img"/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default InventoryComponent;