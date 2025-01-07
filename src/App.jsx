import "./App.scss";
import LuckyWheel from "./Wheel/Wheel";
import FileUpload from "./FileUpload/FileUpload";
import { useEffect, useRef, useState } from "react";

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
    const [fileContent, setFileContent] = useState([]);
    const [items, setItems] = useState([]);
    const [turnMusic, setTurnMusic] = useState(false);
    const audioRef = useRef(null);

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

    const handlePlayMusic = () => {
        if (audioRef.current) {
            audioRef.current.volume = 0.3;
            audioRef.current.play();
        }
    };

    const handlePauseMusic = () => {
        if (audioRef.current) {
            audioRef.current.pause();
        }
    };

    useEffect(() => {
        if (turnMusic === true) {
            handlePlayMusic();
        } else {
            handlePauseMusic();
        }
    }, [turnMusic]);

    return (
        <div
            className="app"
            style={{
                width: "100%",
                height: "100%",
                backgroundImage: `url(${process.env.PUBLIC_URL}/lucky_bg.jpg)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <audio
                ref={audioRef}
                src={`${process.env.PUBLIC_URL}/music.mp3`}
                loop
            />
            <div className="file-import-area">
                <FileUpload
                    setListData={setFileContent}
                    isMusicOn={turnMusic}
                    setTurnMusic={setTurnMusic}
                />
            </div>
            <h1 className="lucky-title">Lucky Draw</h1>
            <LuckyWheel data={items} onUpdate={handleUpdateItems} />
        </div>
    );
}

export default App;
