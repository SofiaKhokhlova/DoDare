import "../css/store.css";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getAllItemsInInventory, getItemsForCharacter} from "../service/InventoryService.ts";
import {buyStoreItem, getAllStoreItems} from "../service/StoreService.ts";
import { useAppContext } from '../context/PointsContext.tsx';

function StoreComponent () {

    const token = localStorage.getItem("accessToken");
    const userIdStr = localStorage.getItem("userId");
    const userIdForStore = parseInt(userIdStr ?? "0");

    const { points, updatePoints } = useAppContext();

    type StoreItem = {
        id: number;
        name: string;
        description: string;
        fileName: string;
        type: string;
        price: number;
        imageUrl: string;
    };

    type StoreCharacter = {
        head: StoreItem;
        body: StoreItem;
        legs: StoreItem;
    };

    type UserInventory = {
        head: StoreItem[];
        body: StoreItem[];
        legs: StoreItem[];
    }

    const [headStoreItems, setHeadStoreItems] = useState<StoreItem[]>([]);
    const [bodyStoreItems, setBodyStoreItems] = useState<StoreItem[]>([]);
    const [legsStoreItems, setLegsStoreItems] = useState<StoreItem[]>([]);

    const [userInventory, setUserInventory] = useState<UserInventory | null>(null);

    const [selectedItem, setSelectedItem] = useState<StoreItem[]>([]);
    const [previewCharacter, setPreviewCharacter] = useState<StoreCharacter | null>(null);

    const [isVisible, setIsVisible] = useState("Store");
    const nav = useNavigate();

    useEffect(() => {
        getAllItemsInInventory(token)
            .then(response => {
                const items: StoreItem[] = response.data;

                const headItemsResponse = items.filter(item => item.type === "HEAD");
                const bodyItemsResponse = items.filter(item => item.type === "BODY");
                const legsItemsResponse = items.filter(item => item.type === "LEGS");

                setUserInventory({head: headItemsResponse, body: bodyItemsResponse, legs: legsItemsResponse});
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const setSelectedItemWithType = (type: string, itemId: number) => {
        if (type === "HEAD") {
            const headPreview = headStoreItems.find((item) => item.id === itemId);
            if (headPreview) {
                setSelectedItem(prevSelectedItem => [...prevSelectedItem, headPreview]);
            }
        } else if (type === "BODY") {
            const bodyPreview = bodyStoreItems.find((item) => item.id === itemId);
            if (bodyPreview) {
                setSelectedItem(prevSelectedItem => [...prevSelectedItem, bodyPreview]);
            }
        } else if (type === "LEGS") {
            const legsPreview = legsStoreItems.find((item) => item.id === itemId);
            if (legsPreview) {
                setSelectedItem(prevSelectedItem => [...prevSelectedItem, legsPreview]);
            }
        }
    };

    const handleAcquireItem = (itemId: number) => {
        const itemInInventory = [...userInventory.head, ...userInventory.body, ...userInventory.legs].some(item => item.id === itemId);

        if (itemInInventory) {
            alert("You already have this item in your inventory.");
            return;
        }

        if (points < selectedItem[selectedItem.length - 1].price) {
            alert("You do not have enough points to buy this item.");
            return;
        }

        buyStoreItem(itemId, token)
            .then(response => {
                const itemResponse: StoreItem = response.data;
                updatePoints(-itemResponse.price);
                nav("/user/inventory");
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleCancelPreview = () => {
        nav("/user/store");
    };

    useEffect(() => {
        getAllStoreItems()
            .then(response => {
                const items: StoreItem[] = response.data;

                const headItemsResponse = items.filter(item => item.type === "HEAD");
                const bodyItemsResponse = items.filter(item => item.type === "BODY");
                const legsItemsResponse = items.filter(item => item.type === "LEGS");

                setHeadStoreItems(headItemsResponse);
                setBodyStoreItems(bodyItemsResponse);
                setLegsStoreItems(legsItemsResponse);
            })
            .catch(error => {
                console.error(error);
            })
    }, [])

    useEffect(() => {
        if(selectedItem)
            console.log(selectedItem[selectedItem.length - 1]);
    }, [selectedItem]);

    const handleOpenItemPreview = (item: StoreItem, type: string) => {
        setIsVisible("ItemPreview");

        setSelectedItemWithType(type, item.id);

        setSelectedItem(prevSelectedItem => {
            const newSelectedItem = [...prevSelectedItem];
            newSelectedItem.push(item);
            return newSelectedItem;
        });
    };

    useEffect(() => {
        if (selectedItem.length > 0) {
            getItemsForCharacter(userIdForStore).then(response => {
                const { id, userId, headId, bodyId, legsId } = response.data;

                if (selectedItem[selectedItem.length - 1].type === "HEAD") {
                    const bodyCharacter = bodyStoreItems.find((body) => body.id == bodyId);
                    const legsCharacter = legsStoreItems.find((legs) => legs.id == legsId);
                    if (bodyCharacter && legsCharacter) {
                        setPreviewCharacter({ ...previewCharacter!, head: selectedItem[selectedItem.length - 1], body: bodyCharacter, legs: legsCharacter});
                    }
                }

                if (selectedItem[selectedItem.length - 1].type === "BODY") {
                    const headCharacter = headStoreItems.find((head) => head.id == headId);
                    const legsCharacter = legsStoreItems.find((legs) => legs.id == legsId);
                    if (headCharacter && legsCharacter) {
                        setPreviewCharacter({ ...previewCharacter!, head: headCharacter, body: selectedItem[selectedItem.length - 1], legs: legsCharacter });
                    }
                }

                if (selectedItem[selectedItem.length - 1].type === "LEGS") {
                    const bodyCharacter = bodyStoreItems.find((body) => body.id == bodyId);
                    const headCharacter = headStoreItems.find((head) => head.id == headId);
                    if (headCharacter && bodyCharacter) {
                        setPreviewCharacter({ ...previewCharacter!, head: headCharacter, body: bodyCharacter, legs: selectedItem[selectedItem.length - 1] });
                    }
                }
            });
        }
    }, [selectedItem]);


    useEffect(() => {
        if(previewCharacter)
            console.log("preview character: ")
            console.log(previewCharacter);
    },[previewCharacter]);

    return(
        <>
            {isVisible === "Store" && <div className="store-component">
                <p className="store-title">Store</p>
                <div className="store-items">
                    <p className="store-items-name">Hats</p>
                    <div className="store-items-container">
                        {headStoreItems.map((item) => (
                            <div key={item.id} className="store-item" style={{
                                marginRight: item.id === headStoreItems[headStoreItems.length - 1].id ? "0" : "2.344vw"
                            }} onClick={() => handleOpenItemPreview(item, "HEAD")}>
                                <img src={item.imageUrl} alt="" className="store-item-head-img"/>
                                <div className="item-price-container">
                                    <p className="item-price">{item.price}</p>
                                    <img className="point-price" src="/point.png" alt="point"/>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="store-items-name">Jackets</p>
                    <div className="store-items-container">
                        {bodyStoreItems.map((item) => (
                            <div key={item.id} className="store-item" style={{
                                marginRight: item.id === bodyStoreItems[bodyStoreItems.length - 1].id ? "0" : "2.344vw"
                            }} onClick={() => handleOpenItemPreview(item, "BODY")}>
                                <img src={item.imageUrl} alt="" className="store-item-body-img"/>
                                <div className="item-price-container">
                                    <p className="item-price">{item.price}</p>
                                    <img className="point-price" src="/point.png" alt="point"/>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="store-items-name">Trousers</p>
                    <div className="store-items-container">
                        {legsStoreItems.map((item) => (
                            <div key={item.id} className="store-item" style={{
                                marginRight: item.id === legsStoreItems[legsStoreItems.length - 1].id ? "0" : "2.344vw"
                            }} onClick={() => handleOpenItemPreview(item, "LEGS")}>
                                <img src={item.imageUrl} alt="" className="store-item-legs-img"/>
                                <div className="item-price-container">
                                    <p className="item-price">{item.price}</p>
                                    <img className="point-price" src="/point.png" alt="point"/>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>}

            {isVisible === "ItemPreview" && <div className="item-preview">
                <p className="item-preview-title">Item preview</p>
                <div className="item-character-preview">
                    {previewCharacter ? (<div className="character-items">
                            <img src={previewCharacter.head.imageUrl} alt="" className="head-img"/>
                            <img src={previewCharacter.body.imageUrl} alt="" className="body-img"/>
                            <img src={previewCharacter.legs.imageUrl} alt="" className="legs-img"/>
                        </div>) :
                        (<p>character doesn't exist</p>)}
                </div>
                {selectedItem ? (<div className="item-data">
                    <p className="item-data-name">Name:</p>
                    <p className="item-data-description">{selectedItem[selectedItem.length - 1].name}</p>
                    <p className="item-data-name">Type:</p>
                    <p className="item-data-description">{selectedItem[selectedItem.length - 1].description}</p>
                    <p className="item-data-name">Price</p>
                    <p className="item-data-description">{selectedItem[selectedItem.length - 1].price}
                        <img src="/point.png" alt="point" className="item-cost"/>
                    </p>
                    <div className="buttons-preview">
                        <button className="acquire-button" onClick={() => handleAcquireItem(selectedItem[selectedItem.length - 1].id)}>Acquire</button>
                        <a href="" className="cancel-preview" onClick={handleCancelPreview}>Cancel</a>
                    </div>
                </div>) : (<p>No selected item</p>)}
            </div>}
        </>
    );
}

export default StoreComponent;