import { useContext, useEffect, useRef, useState } from "react";
import "../styles/block.css";
import runCodeIcon from "../assets/runCode.png";
import OutputTable from "./OutputTable";
import { NotebookContext } from "../contexts/notebookContext";
import { v4 as uuidv4 } from "uuid";
import { sqlizeData, unescapeHTML, executeQuery } from "../utils";

function Block({ blockId, blockIdx, editable }) {
    const codeBlockContent = useRef();
    const block = useRef();
    const { notebook, setBlock, copyNotebook, setNotebook } =
        useContext(NotebookContext);

    useEffect(() => {
        block.current.addEventListener("mouseover", () => {
            let optns = block.current.querySelectorAll(".block-optn");
            optns.forEach((element) => element.classList.remove("hide"));
        });
        block.current.addEventListener("mouseleave", () => {
            let optns = block.current.querySelectorAll(".block-optn");
            optns.forEach((element) => element.classList.add("hide"));
        });
    }, []);

    async function runCode() {
        clearOutput();
        console.log("here");
        let code = codeBlockContent.current.innerHTML;
        let sanitizedCode = unescapeHTML(code.replace(/(<([^>]+)>)/gi, ""));
        let data = await executeQuery(sanitizedCode);
        console.log("executed query");
        let newOutput = "";
        let newBlock = {
            code: sanitizedCode,
            output: "",
            outputStatus: false,
            id: blockId,
        };
        if (data.status) {
            if (data.result.length != 0) {
                newOutput = sqlizeData(data.result);
            } else {
                newOutput = [["Ran successfully. No rows were returned."]];
            }

            newBlock.output = newOutput;
            newBlock.outputStatus = true;
        } else {
            newOutput = data.result[0];
            newBlock.output = newOutput;
        }
        setBlock(blockIdx, newBlock);
    }
    function clearOutput() {
        let code = codeBlockContent.current.innerHTML;
        let sanitizedCode = unescapeHTML(code.replace(/(<([^>]+)>)/gi, ""));
        let newBlock = {
            code: sanitizedCode,
            output: "",
            outputStatus: false,
            id: blockId,
        };
        setBlock(blockIdx, newBlock);
    }
    function addBlockBelow() {
        let newNotebook = copyNotebook(notebook);
        let newBlock = {
            code: "",
            output: "",
            outputStatus: false,
            id: uuidv4(),
        };
        newNotebook.splice(blockIdx + 1, 0, newBlock);
        setNotebook(newNotebook);
    }
    function removeBlock() {
        let newNotebook = copyNotebook(notebook);
        newNotebook.splice(blockIdx, 1);
        setNotebook(newNotebook);
    }
    function updateBlock(){
        let code = codeBlockContent.current.innerHTML;
        let sanitizedCode = unescapeHTML(code.replace(/(<([^>]+)>)/gi, ""));
        let newBlock = {
            code: sanitizedCode,
            output: notebook[blockIdx].output,
            outputStatus: notebook[blockIdx].outputStatus,
            id: blockId,
        };
        setBlock(blockIdx,newBlock);
    }
    return (
        <div className="block" ref={block}>
            <div className="code-block">
                <div className="code-block-info">
                    {
                        editable ?
                            <button className="run-code-button" onClick={runCode}>
                                <img src={runCodeIcon} />
                            </button>
                            :
                            <button className="run-code-button" onClick={runCode} disabled>
                                <img src={runCodeIcon} />
                            </button>
                    }

                </div>
                <div
                    className="code-block-content"
                    contentEditable={editable}
                    ref={codeBlockContent}
                    spellCheck="false"
                    onKeyUpCapture={updateBlock}
                />
            </div>
            {(() => {
                if (notebook[blockIdx].output.length > 0)
                    return (
                        <div
                            className={
                                "output-block" +
                                " " +
                                (notebook[blockIdx].outputStatus
                                    ? "output-success"
                                    : "output-error")
                            }
                        >
                            <div className="output-block-info">
                                <span
                                    className="clear-output"
                                    onClick={clearOutput}
                                >
                                    [ CLEAR ]
                                </span>
                            </div>
                            {(() => {
                                if (notebook[blockIdx].outputStatus) {
                                    if (notebook[blockIdx].output) {
                                        return (
                                            <OutputTable
                                                data={notebook[blockIdx].output}
                                            ></OutputTable>
                                        );
                                    }
                                    return "Ran successfully. No rows were returned.";
                                } else {
                                    return (
                                        <div className="output-text">
                                            {notebook[blockIdx].output}
                                        </div>
                                    );
                                }
                            })()}
                        </div>
                    );
                else return null;
            })()}
            {editable ?
                <div className="block-optn-wrapper">
                    <button className="block-optn hide" onClick={addBlockBelow}>
                        New Block
                    </button>
                    <button className="block-optn hide" onClick={removeBlock}>
                        Delete Block
                    </button>
                </div>
                : undefined
            }

        </div>
    );
}

export default Block;
