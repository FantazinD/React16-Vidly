import React, { Component } from "react";

const HeartReact = ({ onClick, isLiked }) => {
    return (
        <i
            onClick={onClick}
            className={`fa ${isLiked ? `fa-heart` : `fa-heart-o`}`}
            aria-hidden="true"
            style={{ cursor: "pointer" }}
        ></i>
    );
};

export default HeartReact;
