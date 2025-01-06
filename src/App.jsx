import "./App.scss";
import LuckyWheel from "./Wheel/Wheel";
import FileUpload from "./FileUpload/FileUpload";
import { useEffect, useState } from "react";

const COLORS = [
    "#FF5733", // Red-Orange
    "#33FF57", // Green
    "#3357FF", // Blue
    "#FF33A1", // Pink
    "#FFD700", // Gold
    "#33FFF5", // Aqua
    "#800080", // Purple
    "#FF8C00", // Dark Orange
];

function App() {
    //4. Popup remove or continue item -> handle if remove

    const [fileContent, setFileContent] = useState([]);
    const [items, setItems] = useState([]);

    useEffect(() => {
        // random color
        const count = fileContent.length;
        let listData = fileContent.map((item, index) => {
            let color = COLORS[index % COLORS.length];
            if (index === count - 1) {
                if (color === COLORS[0]) {
                    color = COLORS[1];
                }
            }
            return {
                title: item,
                value: 1,
                color: color,
            };
        });

        setItems(listData);
    }, [fileContent]);

    const handleUpdateItems = (newItems) => {
        // random color
        const count = newItems.length;
        let listData = newItems.map((item, index) => {
            let color = COLORS[index % COLORS.length];
            if (index === count - 1) {
                if (color === COLORS[0]) {
                    color = COLORS[1];
                }
            }
            item.color = color;
            return item;
        });

        setItems(listData);
    };

    return (
        <div
            className="app"
            style={{
                width: "100%",
                height: "100%",
                backgroundImage: `url(${process.env.PUBLIC_URL}/lucky_bg.png)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="file-import-area">
                <FileUpload setListData={setFileContent} />
            </div>
            <LuckyWheel data={items} onUpdate={handleUpdateItems} />
        </div>
    );
}

export default App;
