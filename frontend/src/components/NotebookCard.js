import React from "react";

const NotebookCard = ({ name, url }) => {
    return (
        <div className="nb-card">
            <a href={url} target="_blank">
                <h1>{name}</h1>
            </a>
        </div>
    );
};

export default NotebookCard;
