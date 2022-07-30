import React from "react";
import NotebookCard from "./NotebookCard";

const NotebookCardList = ({ nb, curruser }) => {
    return (
        <div className="nb-card-container">
            {nb.map((n) => (
                <NotebookCard key={n.id} name={n.name} url={"nb/" + n.id} />
            ))}
        </div>
    );
};

export default NotebookCardList;
