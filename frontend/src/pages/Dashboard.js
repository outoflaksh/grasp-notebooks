import React from "react";
import "../styles/dashboard.css";
import { useState, useEffect } from "react";
import NotebookCardList from "../components/NotebookCardList";

const Dashboard = () => {
    const curruser = localStorage.getItem("currUser");
    const [nbReq, setNbReq] = useState({
        loading: false,
        nb: [],
    });

    const notebooks = ["nb1", "nb2", "new notebook"];

    useEffect(() => {
        setNbReq({ loading: true });
        fetch("http://localhost:8000/nb/all")
            .then((results) => results.json())
            .then((data) => {
                setNbReq({
                    loading: false,
                    nb: data,
                });
            });
    }, []);

    const { loading, nb } = nbReq;
    return (
        <div className="dashboard-container">
            <h1 className="heading">Notebook Dashboard</h1>
            <a href="workplace" target="_blank">
                <button className="new-nb-btn">Create a new notebook</button>
            </a>
            <p>{loading && "Loading..."}</p>
            <section className="nb-container">
                {nb && <NotebookCardList nb={nb} />}
            </section>
        </div>
    );
};

export default Dashboard;
