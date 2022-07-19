import { useContext, useEffect, useState } from "react";
import { NotebookContext } from "../contexts/notebookContext";
import "../styles/notebook.css";
import Block from "./Block";
import { v4 as uuidv4 } from "uuid";
import { MenuContext } from "../contexts/menuContext";
import { useMenu } from "../hooks";

function Notebook() {
    const {
        notebook,
        setNotebook, } = useContext(NotebookContext);
    const { setMenuItems } = useContext(MenuContext);
    useMenu([
        <button key={uuidv4()} onClick={saveNotebook}>Save</button>,
        <button key={uuidv4()}>Clear All Output</button>,
        <button key={uuidv4()} onClick={startFresh}>Start Fresh</button>,
    ]);


    async function saveNotebook() {
        const requestBody = JSON.stringify(notebook);
        const response = await fetch("http://localhost:8000/save/", {
            method: "POST",
            mode: "cors",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            body: requestBody,
        });
    }
    function startFresh() {
        setNotebook([
            {
                code: "",
                output: "",
                outputStatus: false,
                id: uuidv4(),
            },
        ]);
    }

    return (
        <div className="notebook-wrapper">
            <div className="notebook">
                {notebook.map((block, blockIdx) =>
                    <div className="block-wrapper" key={"block-wrapper" + block.id}>
                        <Block
                            blockIdx={blockIdx}
                            blockId={block.id}
                            key={"block" + block.id}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Notebook;
