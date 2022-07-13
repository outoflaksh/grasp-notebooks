import { useRef, useState } from "react";
import "../styles/block.css"
import runCodeIcon from "../assets/runCode.png"


async function executeQuery(code) {

    const requestBody = JSON.stringify({ query: code });

    console.log(requestBody);

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
        let output = "";
        data.result.forEach((element) => { output += element });
        setOutputStatus(data.status);
        setOutput(output);
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
                output.length > 0 ?
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
                        <div className="output-text">
                            {output}
                        </div>
                    </div>
                    : null
            }

        </div>
    );
}

export default Block;