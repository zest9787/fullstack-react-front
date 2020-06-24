import React from "react";

export const loadingDiv = () => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#8d878a",
                opacity: "45%",
                height: "100vh",
            }}
        >
            <h1 style={{ color: "#000000", zIndex: "9999", opacity: "100%" }}>
                로딩중입니다.
            </h1>
        </div>
    );
};