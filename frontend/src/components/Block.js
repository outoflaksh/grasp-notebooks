import { useRef, useState } from "react";
import "../styles/block.css"
import runCodeIcon from "../assets/runCode.png"
import OutputTable from "./OutputTable";


function sqlizeData(data) {
    let columns = [];
    for (let column in data[0]) {
        columns.push(column);
    }
    let matrix = [[...columns]];
    data.shift();
    for (let r of data) {
        let row = [];
        for (let col_name of columns) {
            row.push(r[col_name]);
        }
        matrix.push(row);
    }
    return matrix;
}



async function executeQuery(code) {

    const requestBody = JSON.stringify({ query: code });
    const response = await fetch("http://localhost:8000/run/", {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: requestBody,
    });
    const data = await response.json();
    return data;
}




function Block() {
    const codeBlockContent = useRef();
    const [output, setOutput] = useState("");
    const [outputStatus, setOutputStatus] = useState(false);

    async function runCode() {
        setOutput("");
        let content = codeBlockContent.current.innerHTML;
        let sanitizedCode = content.replace(/(<([^>]+)>)/ig, '');
        let data = await executeQuery(sanitizedCode);
        let newOutput = "";
        if (data.status) {
            newOutput = sqlizeData(data.result);
            // console.log("sqlized data",newOutput);
            setOutput(newOutput);
        }
        else {
            newOutput = data.result[0];
            setOutput(newOutput);
        }
        setOutputStatus(data.status);
    }
    function clearOutput() {
        setOutput("");
    }
    return (
        <div className="block">
            <div className="code-block">
                <div className="code-block-info">
                    <button
                        className="run-code-button"
                        onClick={runCode}>
                        <img src={runCodeIcon} />
                    </button>
                </div>
                <pre className="code-block-content" contentEditable="true" ref={codeBlockContent} spellCheck="false">
                </pre>
            </div>
            {
                (() => {
                    if (output.length > 0) {
                        return (
                            <div
                                className={
                                    "output-block" +
                                    " " +
                                    (outputStatus ? "output-success" : "output-error")
                                }
                            >
                                <div className="output-block-info">
                                    <span className="clear-output" onClick={clearOutput}>[ CLEAR ]</span>
                                </div>
                                {
                                    (() => {
                                        if (outputStatus) {
                                            return <OutputTable data={output}></OutputTable>;
                                        }
                                        else {
                                            return (
                                                <div className="output-text">
                                                    {output}
                                                </div>
                                            );
                                        }
                                    })()
                                }

                            </div>
                        );
                    }
                    else {
                        return null;
                    }
                })()
            }

        </div>
    );
}

export default Block;