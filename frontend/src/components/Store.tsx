import "../css/store.css";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

function StoreComponent () {
    const [isVisible, setIsVisible] = useState("Store");
    const nav = useNavigate();

    const handleOpenItemPreview = () => {
        setIsVisible("ItemPreview")
    }

    const handleAcquireItem = () => {
        nav("/user/inventory");
    }

    const handleCancelPreview = () => {
        nav("/user/store");
    }

    return(
        <>
            {isVisible === "Store" && <div className="store-component">
                <p className="store-title">Store</p>
                <div className="store-items">
                    <p className="store-items-name">Hats</p>
                    <div className="store-items-container">
                        {Array.from({ length: 10 }).map((_, index) => (
                            <div key={index} className="store-item" style={{
                                marginRight: index === 9 ? "0" : "2.344vw"
                            }} onClick={handleOpenItemPreview}>
                                <div className="item-price-container">
                                    <p className="item-price">40</p>
                                    <img className="point-price" src="/point.png" alt="point"/>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="store-items-name">Jackets</p>
                    <div className="store-items-container">
                        {Array.from({ length: 10 }).map((_, index) => (
                            <div key={index} className="store-item" style={{
                                marginRight: index === 9 ? "0" : "2.344vw"
                            }} onClick={handleOpenItemPreview}>
                                <div className="item-price-container">
                                    <p className="item-price">40</p>
                                    <img className="point-price" src="/point.png" alt="point"/>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="store-items-name">Trousers</p>
                    <div className="store-items-container">
                        {Array.from({ length: 10 }).map((_, index) => (
                            <div key={index} className="store-item" style={{
                                marginRight: index === 9 ? "0" : "2.344vw"
                            }} onClick={handleOpenItemPreview}>
                                <div className="item-price-container">
                                    <p className="item-price">40</p>
                                    <img className="point-price" src="/point.png" alt="point"/>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>}

            {isVisible === "ItemPreview" && <div className="item-preview">
                <p className="item-preview-title">Item preview</p>
                <div className="item-character-preview"></div>
                <div className="item-data">
                    <p className="item-data-name">Name:</p>
                    <p className="item-data-description">Super puper item</p>
                    <p className="item-data-name">Type:</p>
                    <p className="item-data-description">Hat</p>
                    <p className="item-data-name">Price</p>
                    <p className="item-data-description">40
                        <img src="/point.png" alt="point" className="item-cost"/>
                    </p>
                    <div className="buttons-preview">
                        <button className="acquire-button" onClick={handleAcquireItem}>Acquire</button>
                        <a href="" className="cancel-preview" onClick={handleCancelPreview}>Cancel</a>
                    </div>
                </div>
            </div>}
        </>
    );
}

export default StoreComponent;