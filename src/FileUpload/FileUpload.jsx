import React, { useState } from "react";
import "./FileUpload.scss";
import { MdFileUpload, MdClose, MdOutlineRefresh } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { TbMusic, TbMusicOff } from "react-icons/tb";

const FileUpload = ({ setListData, isMusicOn = false, setTurnMusic }) => {
    const [isUploading, setIsUploading] = useState(false);
    const [fileName, setFileName] = useState("");
    const [fileSize, setFileSize] = useState("");
    const [showFileImport, setShowFileImport] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === "text/plain") {
            setIsUploading(true);
            setFileName(file.name);
            setFileSize((file.size / 1024).toFixed(2) + " KB");

            const reader = new FileReader();
            reader.onload = (event) => {
                const text = event.target.result;
                const listData = text
                    .split(/\r?\n/)
                    .filter((line) => line.trim() !== "");

                console.log("count: ", listData.length);

                setListData(listData);
                setIsUploading(false);
            };
            reader.readAsText(file);
        } else {
            alert("Vui lòng chọn file .txt");
        }
    };

    const handleUpload = () => {
        document.getElementById("fileInput").click();
    };

    const handleClearFile = () => {
        document.getElementById("fileInput").value = null;
        setFileName("");
        setFileSize("");
        setListData([]);
    };

    return (
        <>
            {showFileImport ? (
                <div className="file-upload-container">
                    <div className="file-upload-btn-wrapper">
                        <button
                            className={`upload-btn ${
                                isUploading ? "loading" : ""
                            }`}
                            onClick={handleUpload}
                        >
                            {isUploading ? "Đang tải..." : <MdFileUpload />}
                        </button>
                        <button
                            className="refresh-btn"
                            onClick={() => handleClearFile()}
                        >
                            <MdOutlineRefresh />
                        </button>
                        <button
                            className="music-btn"
                            onClick={() => setTurnMusic((prev) => !prev)}
                        >
                            {isMusicOn ? <TbMusic /> : <TbMusicOff />}
                        </button>
                    </div>
                    <input
                        id="fileInput"
                        type="file"
                        accept=".txt"
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                    />
                    {fileName && (
                        <div className="file-info">
                            <span className="file-name">
                                Tên file: {fileName}
                            </span>
                            <span className="file-size">
                                Kích thước: {fileSize}
                            </span>
                        </div>
                    )}
                    <button
                        className="close-btn"
                        onClick={() => setShowFileImport(false)}
                    >
                        <MdClose />
                    </button>
                </div>
            ) : (
                <button
                    className="show-upload-file-btn"
                    onClick={() => setShowFileImport(true)}
                >
                    <IoSettingsSharp size={30} />
                </button>
            )}
        </>
    );
};

export default FileUpload;
