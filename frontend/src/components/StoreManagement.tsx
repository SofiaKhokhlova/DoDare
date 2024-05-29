import "../css/storeManagement.css";
import {useState} from "react";
import {getAllStoreItems} from "../service/StoreService.ts";
import {useNavigate} from "react-router-dom";

function StoreManagement() {
    type StoreItem = {
        id: number;
        name: string;
        description: string;
        fileName: string;
        type: string;
        price: number;
        imageUrl: string;
    };

    /*type NewItem = {
        name: string;
        description: string;
        type: string;
        price: number;
    };

    const [fileName, setFileName] = useState("");
    const [newItem, setNewItem] = useState<NewItem | null>(null);*/

    const [headStoreItems, setHeadStoreItems] = useState<StoreItem[]>([]);
    const [bodyStoreItems, setBodyStoreItems] = useState<StoreItem[]>([]);
    const [legsStoreItems, setLegsStoreItems] = useState<StoreItem[]>([]);

    const [isVisible, setIsVisible] = useState("StoreItems");
    const nav = useNavigate();


    async function fetchItemsForStore() {
        try {
            const response = await getAllStoreItems();
            const items: StoreItem[] = response.data;

            const headItemsResponse = items.filter(item => item.type === "HEAD");
            const bodyItemsResponse = items.filter(item => item.type === "BODY");
            const legsItemsResponse = items.filter(item => item.type === "LEGS");

            setHeadStoreItems(headItemsResponse);
            setBodyStoreItems(bodyItemsResponse);
            setLegsStoreItems(legsItemsResponse);
        } catch (error) {
            console.log(error);
        }
    }

    const handleLogOut = () => {
        localStorage.clear();
        nav('/');
    };

    const handleAddNewItem = () => {
      setIsVisible("NewItemForm");
    };

    fetchItemsForStore();

    return(<>
        <div className="store-manage">
            <div className="header-store-manager">
                <button onClick={handleLogOut}>Log out</button>
                <div className="header-logo-title">
                    <img src="/logo.png" alt="logo"/>
                    <p>DODARE</p>
                </div>
                <button onClick={handleAddNewItem}>Add new item</button>
            </div>

            <div className="store-manager-items">
                {isVisible === "StoreItems" &&
                        <div className="store-items-content">
                            <p className="store-items-name">Hats</p>
                            <div className="store-items-container">
                                {headStoreItems.map((item) => (
                                    <div key={item.id} className="store-item" style={{
                                        marginRight: item.id === headStoreItems[headStoreItems.length - 1].id ? "0" : "2.344vw"
                                    }}>
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
                                    }}>
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
                                    }}>
                                        <img src={item.imageUrl} alt="" className="store-item-legs-img"/>
                                        <div className="item-price-container">
                                            <p className="item-price">{item.price}</p>
                                            <img className="point-price" src="/point.png" alt="point"/>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>}

                {isVisible === "NewItemForm" && <div className="new-item-form">
                    <p>New item</p>
                    {/*<form>
                        <div className="input-item">
                            <input
                                type="text"
                                name="name"
                                placeholder="name"
                                value={newItem.name}
                            />
                        </div>
                            <div className="input-item">
                                <input
                                    type="text"
                                    name="description"
                                    placeholder="description"
                                    value={newItem.description}
                                />
                            </div>
                            <div className="input-item">
                                <input
                                    type="text"
                                    name="type"
                                    placeholder="type(head, body or legs)"
                                    value={newItem.type}
                                />
                            </div>
                            <div className="input-item">
                                <input
                                    type="text"
                                    name="price"
                                    placeholder="price"
                                    value={newItem.price}
                                />
                            </div>
                            <div className="input-item">
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/png, image/jpeg"
                                    value={fileName}
                                />
                            </div>
                        <button></button>
                    </form>*/}
                </div>}
            </div>
            </div>
    </>
    );
}

export default StoreManagement;