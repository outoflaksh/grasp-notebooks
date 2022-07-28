import { useContext, useEffect, useState, useRef } from "react";
import { NotebookContext } from "../contexts/notebookContext";
import "../styles/notebook.css";
import Block from "./Block";
import { v4 as uuidv4 } from "uuid";
import { MenuContext } from "../contexts/menuContext";
import { useMenu } from "../hooks";

const getElementByIdAsync = id => new Promise(resolve => {
    const getElement = () => {
        const element = document.getElementById(id);
        if (element) {
            resolve(element);
        } else {
            requestAnimationFrame(getElement);
        }
    };
    getElement();
});


function Notebook({ editable }) {
    const {
        notebook,
        setNotebook,
        copyNotebook,
        notebookName,
        setNotebookName,
        notebookId,
    } = useContext(NotebookContext);

    useEffect(() => { }, [notebookName]);
    useEffect(() => {
        async function saveNotebook() {
            const requestBody = {
                id: notebookId,
                name: notebookName,
                data: notebook,
                author_username: "admin",
            };
            console.log("saving nb with data", notebook);
            console.log(requestBody.id);

            const response = await fetch("http://localhost:8000/nb/save/", {
                method: "POST",
                mode: "cors",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            console.log(response.body);
        }
        const click = ()=>{
            console.log("hello");
            saveNotebook();
        }
        getElementByIdAsync("save-notebook-button").then((saveBtn) => {

            saveBtn.addEventListener("click", click)
        });
        return () => {
            getElementByIdAsync("save-notebook-button").then((saveBtn) => {
                saveBtn.removeEventListener("click", click)
            });
        }

    }, [notebook, notebookId, notebookName]);

    useMenu(editable ? [
        <input
            key={uuidv4()}
            onChange={(e) => {
                let v = "" + e.target.value;
                console.log(v);
                setNotebookName(v);
                localStorage.setItem("notebookName", e.target.value);
            }}
            className="notebook-name"
            defaultValue={notebookName}
        />,
        <button key={uuidv4()} id="save-notebook-button">
            Save
        </button>,
        <button key={uuidv4()} onClick={clearAll}>
            Clear All Output
        </button>,
        <button key={uuidv4()} onClick={startFresh}>
            Start Fresh
        </button>,
        <span key={uuidv4()}> share link: {"http://localhost:8000/nb/" + notebookId}</span>,
    ] : [<span key="nb-name">{notebookName}</span>]
    );


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
    function clearAll() {
        let newNotebook = copyNotebook(notebook);
        for (let i = 0; i < newNotebook.length; i++) {
            newNotebook[i].output = "";
            newNotebook[i].outputStatus = false;
        }
        setNotebook(newNotebook);
    }

    return (
        <div className="notebook-wrapper">
            <div className="notebook">
                {notebook.map((block, blockIdx) => (
                    <div
                        className="block-wrapper"
                        key={"block-wrapper" + block.id}
                    >
                        <Block
                            blockIdx={blockIdx}
                            blockId={block.id}
                            key={"block" + block.id}
                            editable={editable}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Notebook;
