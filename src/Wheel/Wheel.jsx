import { PieChart } from "react-minimal-pie-chart";
import { useEffect, useState, useRef } from "react";
import Modal from "react-modal";
import "./Wheel.scss";

// Easing function
const easeOutQuad = (t) => {
    return t * (2 - t);
};

Modal.setAppElement("#root");

const LuckyWheel = ({ data, onUpdate }) => {
    const [rotation, setRotation] = useState(0);
    const [isSpinning, setIsSpinning] = useState(false);
    const wheelRef = useRef(null);
    const requestIdRef = useRef(null); // save requestAnimationFrame ID
    const [selectedItem, setSelectedItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getItemFromAngle = (deviationDeg) => {
        const itemCount = data?.length;
        const degPerItem = 360 / itemCount;
        const itemIndex = Math.floor((360 - deviationDeg) / degPerItem);

        return itemIndex;
    };

    const spinWheel = () => {
        if (isSpinning) return;

        setIsSpinning(true);

        const randomRotation = Math.floor(Math.random() * 360) + 3000;
        const newRotation = rotation + randomRotation;

        let startTime = null;
        const duration = 6000; // spin duration
        const initialRotation = rotation;

        // handle requestAnimationFrame
        const animateRotation = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;

            // apply easing animation
            const easingProgress = easeOutQuad(progress / duration);

            const currentRotation =
                initialRotation +
                easingProgress * (newRotation - initialRotation);
            setRotation(currentRotation);

            if (progress < duration) {
                requestIdRef.current = requestAnimationFrame(animateRotation);
            } else {
                setIsSpinning(false);
                cancelAnimationFrame(requestIdRef.current);

                // select item
                let pauseDeg = newRotation % 360;
                let itemIndex = getItemFromAngle(pauseDeg);

                setSelectedItem(itemIndex);
                setIsModalOpen(true);

                setRotation(pauseDeg);
            }
        };

        requestIdRef.current = requestAnimationFrame(animateRotation);
    };

    useEffect(() => {
        return () => {
            // Cleanup
            cancelAnimationFrame(requestIdRef.current);
        };
    }, []);

    const onClose = () => {
        setIsModalOpen(false);
    };

    const handleRemoveSelectItem = () => {
        var newList = data.filter((_, index) => index !== selectedItem);
        onUpdate(newList);
        setRotation(0);
        setIsModalOpen(false);
    };

    useEffect(() => {
        setSelectedItem(null);
        setRotation(0);
    }, [data]);

    return (
        <>
            <div className="wheel-container">
                <div className="wheel">
                    <div className="wheel-chart-spin" ref={wheelRef}>
                        <PieChart
                            data={data}
                            lineWidth={70}
                            lengthAngle={360}
                            startAngle={rotation}
                            animate={true}
                            animationDuration={1000}
                            label={({ dataEntry }) => dataEntry.title}
                            labelPosition={80}
                            labelStyle={{
                                fontSize: "4px",
                                fontWeight: "bold",
                                fill: "#fff",
                            }}
                        />
                    </div>
                    {/* Button Spin */}
                    <button className="center-logo" onClick={spinWheel}>
                        <img src="/logo.png" alt="Logo" className="logo" />
                    </button>
                    {/* Arrow */}
                    <div className="wheel-arrow"></div>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                className="modal"
                overlayClassName="custom-modal-overlay"
                shouldCloseOnOverlayClick={false}
            >
                <div className="modal-header">
                    <span>Chúc mừng</span>
                    <button className="close-btn" onClick={onClose}>
                        X
                    </button>
                </div>
                <div className="modal-content">
                    <h2>{data[selectedItem]?.title}</h2>
                </div>
                <div className="modal-footer">
                    <button className="continue-btn" onClick={onClose}>
                        Tiếp tục
                    </button>
                    <button
                        className="delete-btn"
                        onClick={() => handleRemoveSelectItem()}
                    >
                        Xóa
                    </button>
                </div>
            </Modal>
        </>
    );
};

export default LuckyWheel;
