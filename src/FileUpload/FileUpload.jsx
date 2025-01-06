import React, { useState } from "react";
import "./FileUpload.scss";

const FileUpload = ({ setListData }) => {
    const [isUploading, setIsUploading] = useState(false);
    const [fileName, setFileName] = useState("");
    const [fileSize, setFileSize] = useState("");

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === "text/plain") {
            setIsUploading(true);
            setFileName(file.name);
            setFileSize((file.size / (1024 * 1024)).toFixed(2) + " MB");

            const reader = new FileReader();
            reader.onload = (event) => {
                const text = event.target.result;
                const listData = text
                    .split(/\r?\n/)
                    .filter((line) => line.trim() !== "");

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
        <div className="file-upload-container">
            <button
                className={`upload-btn ${isUploading ? "loading" : ""}`}
                onClick={handleUpload}
            >
                {isUploading ? "Đang tải..." : "Tải file"}
            </button>
            <input
                id="fileInput"
                type="file"
                accept=".txt"
                onChange={handleFileChange}
                style={{ display: "none" }}
            />
            {fileName && (
                <div className="file-info">
                    <span className="file-name">Tên file: {fileName}</span>
                    <span className="file-size">Kích thước: {fileSize}</span>
                </div>
            )}
            {fileName && (
                <button className="close-btn" onClick={() => handleClearFile()}>
                    X
                </button>
            )}
        </div>
    );
};

export default FileUpload;
