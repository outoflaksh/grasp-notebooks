import { useRef, useState } from "react";
import "../styles/block.css"
import runCodeIcon from "../assets/runCode.png"

function Block() {
    const codeBlockContent = useRef();
    const [output, setOutput] = useState("this is the output");

    function runCode() {
        let content = codeBlockContent.current.innerHTML;
        let sanitizedCode = content.replace(/(<([^>]+)>)/ig, '');
        console.log(sanitizedCode);
    }
    function clearOutput(){
        setOutput("");
    }
    return (
        <div className="block">
            <div className="code-block">
                <div className="code-block-info">
                    <button className="run-code-button" onClick={runCode}><img src={runCodeIcon} /></button>
                </div>
                <pre className="code-block-content" contentEditable="true" ref={codeBlockContent} spellCheck="false">
                </pre>
            </div>
            {
                output.length > 0 ?
                    <div className="output-block">
                        <div className="output-block-info">
                            {/* <span className="output-status">[ ]</span> */}
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