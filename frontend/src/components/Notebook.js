import { useContext, useState } from "react";
import { NotebookContext } from "../contexts";
import "../styles/notebook.css";
import Block from "./Block";
import { v4 as uuidv4 } from 'uuid';



function Notebook() {
    let { notebook, setNotebook, copyNotebook, blockCounter, setBlockCounter } = useContext(NotebookContext);

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
        setBlockCounter(0);
        setNotebook([{
            code: "",
            output: "",
            outputStatus: false,
            id:0,
        }]);
    }
    return (
        <div className="notebook-wrapper">
            <div className="notebook-control">
                <button onClick={saveNotebook}>Save</button>
                <button>Clear All Output</button>
                <button onClick={startFresh}>Start Fresh</button>
            </div>
            <div className="notebook">
                {
                    notebook.map((block, blockIdx) => {
                        return (
                            <div className="block-wrapper" key={"block-wrapper" + block.id}>
                                <Block blockIdx={blockIdx} blockId={block.id} key={"block" + block.id} />
                            </div>
                        );
                    })
                }
                {/* {renderedNotebook} */}
            </div>
        </div>
    );
}

export default Notebook;