import "../css/storeManagement.css";
import {useEffect, useState} from "react";
import {getAllStoreItems} from "../service/StoreService.ts";
import {useNavigate} from "react-router-dom";
import {addItemToStore} from "../service/StoreManagmentService.ts";
import axios from "axios";

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

    type NewItem = {
        name: string;
        description: string;
        type: number;
        price: number;
    };

    const [image, setImage] = useState<File | null>(null);
    const [newItem, setNewItem] = useState<NewItem>({ name: '', description: '', type: -1, price: 0 });
    const [headStoreItems, setHeadStoreItems] = useState<StoreItem[]>([]);
    const [bodyStoreItems, setBodyStoreItems] = useState<StoreItem[]>([]);
    const [legsStoreItems, setLegsStoreItems] = useState<StoreItem[]>([]);

    const [isVisible, setIsVisible] = useState("StoreItems");
    const nav = useNavigate();


    useState(() => {
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
    })

    const handleLogOut = () => {
        localStorage.clear();
        nav('/');
    };

    const handleAddNewItem = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsVisible("NewItemForm");
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewItem(currentItem => ({
            ...currentItem,
            [name]: name === "price" || name === "type" ? parseInt(value) : value
        }));
    };

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        setNewItem({ ...newItem, type: selectedValue });
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setImage(event.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        if (!image) {
            alert("Please select an image.");
            return;
        }

        const formData = new FormData();
        formData.append('image', image, image.name);
        formData.append('data', new Blob([JSON.stringify(newItem)], { type: "application/json" }));

        try {
            const response = await axios.post("http://localhost:8080/api/items/create", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            console.log('Item created successfully', response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Axios error', error.message);
            } else {
                console.error('Unexpected error', error);
            }
        }
        alert("Item successfully added");
        setNewItem({ name: '', description: '', type: -1, price: 0 });
        nav("/update-store");
    };


    return(<>
        <div className="store-manage">
            <div className="header-store-manager">
                <button onClick={handleLogOut}>Log out</button>
                <div className="header-logo-title">
                    <img src="/logo.png" alt="logo"/>
                    <p>DODARE</p>
                </div>
                <button onClick={(event) => handleAddNewItem(event)}>Add new item</button>
            </div>

            <div className="store-manager-items" style={{
                width: isVisible === "NewItemForm" ? "30.729vw" : "78.125vw",
                marginLeft: isVisible === "StoreItems" ? "11%" : "35%"
            }}>
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
                    <form onSubmit={handleSubmit}>
                        <div className="input-item">
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={newItem.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="input-item">
                            <input
                                type="text"
                                name="description"
                                placeholder="Description"
                                value={newItem.description}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="input-item">
                            <select
                                name="type"
                                value={newItem.type !== -1 ? newItem.type : ""}
                                onChange={handleSelectChange}
                            >
                                <option value="" disabled={true}>Select Type</option>
                                <option value="0">Head</option>
                                <option value="1">Body</option>
                                <option value="2">Legs</option>
                            </select>
                        </div>
                        <div className="input-item">
                            <input
                                type="number"
                                name="price"
                                placeholder="Price"
                                value={newItem.price !== 0 ? newItem.price : ""}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="input-item-img">
                            <input
                                type="file"
                                id="file-input"
                                name="image"
                                accept="image/png, image/jpeg"
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />
                            <label htmlFor="file-input">
                                {image?.name ? image.name : "Choose the file"}
                            </label>
                        </div>
                        <button type="submit">Add new item</button>
                    </form>
                </div>}
            </div>
            </div>
    </>
    );
}

export default StoreManagement;