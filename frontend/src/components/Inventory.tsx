import "../css/inventory.css";
import {useEffect, useState} from "react";
import {equipItemOnCharacter, getAllItemsInInventory, getItemsForCharacter} from "../service/InventoryService.ts";

function InventoryComponent () {
    const token = localStorage.getItem("accessToken");
    const userIdStr = localStorage.getItem("userId");
    const userIdForInventory = parseInt(userIdStr ?? "0");

    type Item = {
      id: number;
      name: string;
      description: string;
      fileName: string;
      type: string;
      price: number;
      imageUrl: string;
    };

    type Character = {
        head: Item;
        body: Item;
        legs: Item;
    };

    const [headItems, setHeadItems] = useState<Item[]>([]);
    const [bodyItems, setBodyItems] = useState<Item[]>([]);
    const [legsItems, setLegsItems] = useState<Item[]>([]);

    const [character, setCharacter] = useState<Character | null>(null);

    useEffect(() => {
        getAllItemsInInventory(token)
            .then(response => {
                const items: Item[] = response.data;
                console.log(response.data);

                const headItemsResponse = items.filter(item => item.type === "HEAD");
                const bodyItemsResponse = items.filter(item => item.type === "BODY");
                const legsItemsResponse = items.filter(item => item.type === "LEGS");

                setHeadItems(headItemsResponse);
                setBodyItems(bodyItemsResponse);
                setLegsItems(legsItemsResponse);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleEquipItem = (itemId: number, type: string) => {
        equipItemOnCharacter(itemId, token)
            .then(response => {
                if (response.statusText === "Success") {
                    let itemToEquip: Item | undefined;

                    if (type === "HEAD") {
                        itemToEquip = headItems.find(item => item.id === itemId);
                    } else if (type === "BODY") {
                        itemToEquip = bodyItems.find(item => item.id === itemId);
                    } else if (type === "LEGS") {
                        itemToEquip = legsItems.find(item => item.id === itemId);
                    }

                    if (itemToEquip) {
                        setCharacter(prevCharacter => ({
                            ...prevCharacter,
                            [type.toLowerCase()]: itemToEquip,
                        }));
                    }
                }
            })
            .catch(error => {
                console.error(error);
            });
    };

    async function fetchCharacter() {
        try {
            const response = await getItemsForCharacter(userIdForInventory);
            const {id, userId, headId, bodyId, legsId} = response.data;

            const headCharacter = headItems.find((head) => head.id == headId);
            const bodyCharacter = bodyItems.find((body) => body.id == bodyId);
            const legsCharacter = legsItems.find((legs) => legs.id == legsId);

            if (headCharacter && bodyCharacter && legsCharacter) {
                setCharacter({head: headCharacter, body: bodyCharacter, legs: legsCharacter});
            }
        } catch (error) {
            console.error(error);
        }
    }

    fetchCharacter();

    return(
        <>
            <div className="inventory-component">
                <p className="inventory-title">Your inventory</p>
                <div className="character-block">
                    {character ? (<div className="character-items">
                        <img src={character.head.imageUrl} alt="" className="head-img"/>
                        <img src={character.body.imageUrl} alt="" className="body-img"/>
                        <img src={character.legs.imageUrl} alt="" className="legs-img"/>
                    </div>) :
                        (<p>character doesn't exist</p>)}
                </div>
                <div className="items-container">
                    <p className="item-title">Head</p>
                    <div className="item-content">
                        {headItems.map((item) => (
                            <div key={item.id} className="item" onClick={() => handleEquipItem(item.id, "HEAD")}>
                                <img src={`${item.imageUrl}`} alt="head" className="item-img"/>
                            </div>
                        ))}
                    </div>
                    <p className="item-title">Body</p>
                    <div className="item-content">
                        {bodyItems.map((item) => (
                            <div key={item.id} className="item" onClick={() => handleEquipItem(item.id, "BODY")}>
                                <img src={`${item.imageUrl}`} alt="" className="item-img"/>
                            </div>
                        ))}
                    </div>
                    <p className="item-title">Legs</p>
                    <div className="item-content">
                        {legsItems.map((item) => (
                            <div key={item.id} className="item" onClick={() => handleEquipItem(item.id, "LEGS")}>
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